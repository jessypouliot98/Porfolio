"use client";

import { useEffect, useState } from "react";
import { Asset } from "contentful";
import { assertDefined } from "@repo/util/src/assertDefined";
import { clsx } from "clsx";
import { lerp } from "@repo/util/src/math/lerp";
import { clamp } from "@repo/util/src/math/clamp";
import { isDefined } from "@repo/util/src/isDefined";

export type VideoContentProps = {
  className?: string;
  classNames?: Partial<Record<"container" | "video", string>>;
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  focused?: boolean;
}

export function VideoContent({ className, media, focused }: VideoContentProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const file = media.fields.file;
  assertDefined(file, "video media not defined");

  useEffect(() => {
    if (!video) return;

    if (focused) {
      video.currentTime = 0;
      void video.play();
    } else {
      video.pause();
    }
  }, [video, focused]);

  useEffect(() => {
    if (!container || !svg || !video) return;
    const pathTopLeft = svg.querySelector("[data-bar='top-left']");
    const pathBottomRight = svg.querySelector("[data-bar='bottom-right']");
    assertDefined(pathTopLeft, "pathTopLeft is required");
    assertDefined(pathBottomRight, "pathBottomRight is required");

    const abortController = new AbortController();
    let rect = container.getBoundingClientRect();

    const update = () => {
      const { width, height } = rect;
      const total = width + height;
      const heightProgressRange = height / total;
      const widthProgressRange = width / total;
      const progress = video.currentTime / video.duration;

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      {
        const verticalProgress = clamp(
          0,
          lerp(progress, [0, heightProgressRange]),
          1,
        );
        const horizontalProgress = clamp(
          0,
          lerp(progress, [heightProgressRange, 1]),
          1,
        )
        let path = `M 0 ${rect.height}`;
        path += ` v ${-verticalProgress * height}`;
        path += ` h ${horizontalProgress * width}`;
        pathTopLeft.setAttribute("d", path);
      }
      {
        const horizontalProgress = clamp(
          0,
          lerp(progress, [0, widthProgressRange]),
          1,
        )
        const verticalProgress = clamp(
          0,
          lerp(progress, [widthProgressRange, 1]),
          1,
        );
        let path = `M 0 ${rect.height}`;
        path += ` h ${horizontalProgress * width}`;
        path += ` v ${-verticalProgress * height}`;
        pathBottomRight.setAttribute("d", path);
      }
    }

    let loopId: number | undefined;

    const startLoop = () => {
      const doLoop = () => {
        loopId = requestAnimationFrame(() => {
          update();
          doLoop();
        })
      }
      doLoop();
    }

    const stopLoop = () => {
      if (isDefined(loopId)) {
        cancelAnimationFrame(loopId);
      }
    }

    video.addEventListener("pause", stopLoop, { signal: abortController.signal });
    video.addEventListener(
      "play",
      () => {
        rect = container.getBoundingClientRect();
        startLoop();
      },
      { signal: abortController.signal });
    if (!video.paused) {
      startLoop();
    }

    const observer = new ResizeObserver(() => {
      rect = container.getBoundingClientRect();
      update();
    });
    observer.observe(container);

    update();

    return () => {
      stopLoop();
      observer.disconnect();
      abortController.abort();
    }
  }, [container, video, svg]);

  return (
    <div className={clsx("relative", className)} ref={setContainer}>
      <video
        ref={setVideo}
        className={className}
        src={"https:" + file.url}
        aria-description={media.fields.description}
        muted
        loop
        // Fixes ios play in fullscreen
        playsInline
      />
      <svg
        ref={setSvg}
        className="[--stroke:theme(spacing.4)] absolute inset-0 pointer-events-none opacity-70"
        viewBox="0 0 0 0"
      >
        <path className="fill-none stroke stroke-(length:--stroke) stroke-blue-500" data-bar="top-left" d="" />
        <path className="fill-none stroke stroke-(length:--stroke) stroke-blue-500" data-bar="bottom-right" d="" />
      </svg>
    </div>
  )
}