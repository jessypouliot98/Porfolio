import { ComponentPropsWithRef, useEffect, useRef } from "react";
import { bindRefs } from "../../utils/bindRefs";
import { isNotDefined } from "@repo/util/src/isNotDefined";
import { clsx } from "clsx";
import { vector2ScaleContained } from "@repo/util/src/math/vector2ScaleContained";
import { sleep } from "@repo/util/src/sleep";
import { exponentialRetry } from "@repo/util/src/exponentialRetry";
import { result } from "@repo/util/src/result";

export type VideoContainedProps = ComponentPropsWithRef<"video"> & {
  classNames?: Partial<Record<"container" | "video" | "canvas", string>>
  backgroundFrameRate?: number;
};

// https://github.com/AxisCommunications/media-stream-library-js/blob/main/src/streams/components/canvas/index.ts

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
        const [width, height] = vector2ScaleContained([video.videoWidth, video.videoHeight], [canvas.width, canvas.height]);
        // console.log({ width, height, aspectContained: height / width, aspectSource: video.videoHeight / video.videoWidth });
        const bitmap = await createImageBitmap(video)
        ctxBitmap.transferFromImageBitmap(bitmap);
      }
    } else {
      // Fallback
      const ctx2d = ctx;
      drawImageBlob = async () => {
        ctx2d.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
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

    if (!video.paused) {
      startLoop();
    }

    const resizeObserver = new ResizeObserver(() => {
      drawImageBlob();
    });
    resizeObserver.observe(video);

    const intersectionObserver = new IntersectionObserver(() => {
      drawImageBlob();
    });
    intersectionObserver.observe(video);

    video.addEventListener("play", () => {
      startLoop();
    }, { signal: abortController.signal });
    video.addEventListener("pause", () => {
      drawImageBlob();
      stopLoop();
    }, { signal: abortController.signal });
    video.addEventListener("load", () => {
      drawImageBlob();
    }, { signal: abortController.signal });
    video.addEventListener("loadeddata", () => {
      drawImageBlob();
    }, { signal: abortController.signal });


    if (isReady()) {
      result(drawImageBlob)
    } else {
      // Hack "loadeddata" event, it's never handled for some reason
      void exponentialRetry(({ resolve, next, abort }) => {
        if (abortController.signal.aborted) {
          abort();
        } else if (isReady()) {
          drawImageBlob();
          resolve();
        } else {
          next();
        }
      }, {
        retryCount: 5,
        initialDelay: 50,
      })
    }

    return () => {
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
      <canvas
        ref={canvasRef}
        className={clsx(
          "absolute inset-0 size-full",
          classNames?.canvas
        )}
      />
      {children}
    </div>
  )
}