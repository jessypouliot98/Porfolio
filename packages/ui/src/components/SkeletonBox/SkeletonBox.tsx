import { clsx } from "clsx";

export type SkeletonBoxProps = {
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonBox({ className, style }: SkeletonBoxProps) {
  return (
    <div
      style={style}
      className={clsx("[--color:theme(color.gray.500)] animate-pulse bg-(--color)", className)}
    />
  )
}