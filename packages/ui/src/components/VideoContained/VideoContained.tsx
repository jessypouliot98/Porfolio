import { ComponentPropsWithRef, useEffect, useRef } from "react";
import { bindRefs } from "../../utils/bindRefs";

export type VideoContainedProps = ComponentPropsWithRef<"video">;

export function VideoContained({ ref, children, ...props }: VideoContainedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log(video);
  }, []);

  return (
    <video
      {...props}
      ref={bindRefs(videoRef, ref)}
    >
      {children}
    </video>
  )
}