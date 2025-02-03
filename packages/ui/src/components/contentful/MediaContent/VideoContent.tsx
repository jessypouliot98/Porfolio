import { useEffect, useState } from "react";
import { Asset } from "contentful";
import { assertDefined } from "@repo/util/src/assertDefined";

export type VideoContentProps = {
  className?: string;
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  focused?: boolean;
}

export function VideoContent({ className, media, focused }: VideoContentProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const file = media.fields.file;
  assertDefined(file);

  useEffect(() => {
    if (!video) return;

    if (focused) {
      video.currentTime = 0;
      void video.play();
    } else {
      video.pause();
    }
  }, [video, focused]);

  return (
    <video
      ref={setVideo}
      className={className}
      src={"https:" + file.url}
      aria-description={media.fields.description}
      muted
      loop
    />
  )
}