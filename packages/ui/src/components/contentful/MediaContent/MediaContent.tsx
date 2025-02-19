import { Asset } from "contentful";
import { assertDefined } from "@repo/util/src/assertDefined";
import React from "react";
import { clsx } from "clsx";
import { VideoContent } from "./VideoContent";
import { ImageContained } from "../../ImageContained/ImageContained";

export type MediaContentProps = {
  className?: string;
  classNames?: Partial<Record<"video" | "image", string>>;
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  focused?: boolean;
}

export function MediaContent({ className, classNames, media, focused }: MediaContentProps) {
  const file = media.fields.file;
  assertDefined(file, "media file not defined");

  if (file.contentType.startsWith("video/")) {
    return (
      <VideoContent
        className={clsx(className, classNames?.video)}
        media={media}
        focused={focused}
      />
    )
  }

  if (file.contentType.startsWith("image/")) {
    return (
      <ImageContained
        className={clsx(className, classNames?.image)}
        classNames={{
          container: "size-full overflow-hidden",
          bgImageContainer: "bg-black/70 [--p:theme(spacing.8)] !size-[calc(100%+(2*var(--p)))] !inset-[calc(-1*var(--p))]",
          bgImage: "blur-md brightness-30"
        }}
        src={"https://" + file.url}
        alt={media.fields.description ?? file.fileName}
        loading="lazy"
        width="auto"
        height="auto"
      />
    )
  }

  throw new Error(`${file.fileName} of type ${file.contentType} is not supported`);
}