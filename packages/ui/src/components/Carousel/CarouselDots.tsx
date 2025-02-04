import { useCarouselData } from "./useCarouselData";
import { clsx } from "clsx";

export type CarouselDotsProps<TData> = {
  className?: string;
  keyExtractor: (key: TData) => string;
}

export function CarouselDots<TData>({ className, keyExtractor }: CarouselDotsProps<TData>) {
  const { data, currentIndex, setCurrentIndex } = useCarouselData<TData>();
  return (
    <ol
      className={clsx("flex gap-2 justify-center items-center", className)}
      role="listbox"
    >
      {data.map((item, index) => (
        <li
          key={keyExtractor(item)}
          className="group/dot"
          role="option"
          aria-selected={index === currentIndex}
        >
          <button
            type="button"
            className={clsx(
              "block size-4 rounded-full transition-colors",
              "bg-blue-500 group-aria-selected/dot:bg-orange-500"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        </li>
      ))}
    </ol>
  )
}