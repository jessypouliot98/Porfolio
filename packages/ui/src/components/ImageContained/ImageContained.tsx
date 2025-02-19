import { ComponentPropsWithRef } from "react";
import { clsx } from "clsx";

export type ImageContainedProps = ComponentPropsWithRef<"img"> & {
  classNames?: Partial<Record<"container" | "image" | "bgImageContainer" | "bgImage", string>>
};

export function ImageContained({
  ref,
  children,
  className,
  classNames,
  src,
  srcSet,
  sizes,
  loading,
  alt,
  ...props
}: ImageContainedProps) {
  return (
    <div className={clsx(
      "relative",
      className,
      classNames?.container,
    )}>
      <img
        {...props}
        ref={ref}
        className={clsx(
          "relative z-[1] size-full object-contain",
          classNames?.image,
        )}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        alt={alt}
      />
      <div
        className={clsx(
          "absolute inset-0 size-full",
          classNames?.bgImageContainer,
        )}
      >
        <img
          className={clsx(
            "size-full object-cover",
            classNames?.bgImage,
          )}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          alt={alt}
        />
      </div>
      {children}
    </div>
  )
}