import { ComponentPropsWithRef, useEffect, useRef } from "react";
import { bindRefs } from "../../utils/bindRefs";
import { isNotDefined } from "@repo/util/src/isNotDefined";
import { clsx } from "clsx";
import { exponentialRetry } from "@repo/util/src/exponentialRetry";
import { result } from "@repo/util/src/result";

export type VideoContainedProps = ComponentPropsWithRef<"video"> & {
  classNames?: Partial<Record<"container" | "video" | "canvasContainer" | "canvas", string>>
  backgroundFrameRate?: number;
};

export function VideoContained({
  ref,
  children,
  className,
  classNames,
  backgroundFrameRate = 15,
  ...props
}: VideoContainedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    let hasFrame = false;
    const isReady = () => video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
    const abortController = new AbortController();
    const ctx = "createImageBitmap" in window ? canvas.getContext("bitmaprenderer") : canvas.getContext("2d");

    let drawImageBlob: () => void;
    if (isNotDefined(ctx)) {
      // Can't do anything here ¯\_(ツ)_/¯
      return;
    } else if ("transferFromImageBitmap" in ctx) {
      // Better performance
      const ctxBitmap = ctx;
      drawImageBlob = async () => {
        if (!isReady()) return;
        const bitmap = await createImageBitmap(video)
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctxBitmap.transferFromImageBitmap(bitmap);
      }
    } else {
      // Fallback
      const ctx2d = ctx;
      drawImageBlob = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx2d.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }

    let interval: NodeJS.Timeout | undefined

    const stopLoop = () => {
      clearInterval(interval);
    }

    const startLoop = () => {
      stopLoop();
      interval = setInterval(drawImageBlob, 1000 / backgroundFrameRate);
    }

    const initFirstFrame = async () => {
      if (hasFrame) return;
      if (isReady() && result(drawImageBlob).success) {
        hasFrame = true;
        return;
      }
      const { success } = await exponentialRetry(({ resolve, next, abort }) => {
        if (hasFrame || abortController.signal.aborted) {
          abort();
        } else if (isReady() && result(drawImageBlob).success) {
          resolve();
        } else {
          next();
        }
      }, {
        retryCount: 5,
        initialDelay: 50,
      });
      if (success) {
        hasFrame = true;
      }
    }

    if (!video.paused && isReady()) {
      startLoop();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (isReady() && hasFrame) {
        // Update EXISTING frame
        drawImageBlob();
      }
    });
    resizeObserver.observe(video);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && isReady()) {
        /**
         * Issue where video outside the viewport will not draw on canvas,
         * trigger first frame insertion when the component intersects with viewport
         */
        void initFirstFrame();
      }
    });
    intersectionObserver.observe(video);

    video.addEventListener("play", () => {
      startLoop();
    }, { signal: abortController.signal });
    video.addEventListener("pause", () => {
      drawImageBlob();
      stopLoop();
    }, { signal: abortController.signal });
    video.addEventListener("loadeddata", () => {
      drawImageBlob();
      if (!video.paused) {
        startLoop();
      }
    }, { signal: abortController.signal });

    void initFirstFrame();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      abortController.abort();
      stopLoop();
      if (ctx && "reset" in ctx) {
        ctx.reset();
      }
    }
  }, [backgroundFrameRate]);

  return (
    <div className={clsx(
      "relative",
      className,
      classNames?.container,
    )}>
      <video
        {...props}
        ref={bindRefs(videoRef, ref)}
        className={clsx(
          "relative z-[1] size-full",
          classNames?.video,
        )}
      />
      <div
        className={clsx(
          "absolute inset-0 size-full",
          classNames?.canvasContainer
        )}
      >
        <canvas
          ref={canvasRef}
          className={clsx(
            "size-full object-cover",
            classNames?.canvas,
          )}
        />
      </div>
      {children}
    </div>
  )
}