import { useCarouselData } from "./useCarouselData";
import { clsx } from "clsx";
import { IconCaretLeft, IconCaretRight } from "../icons";

export type CarouselDotsProps<TData> = {
  className?: string;
  labelExtractor: (data: TData, index: number) => string;
  keyExtractor: (data: TData, index: number) => string;
}

export function CarouselDots<TData>({ className, keyExtractor, labelExtractor }: CarouselDotsProps<TData>) {
  const { data, currentIndex, setCurrentIndex } = useCarouselData<TData>();
  return (
    <div className={clsx(
      "flex items-center justify-center gap-2",
      className,
    )}>
      <button
        type="button"
        className="transition-colors text-xl p-1 text-blue-500 hover:bg-blue-100"
        aria-label="previous"
        onClick={() => {
          setCurrentIndex((prev) => {
            if (prev <= 0) {
              return data.length - 1;
            }
            return prev - 1;
          })
        }}
      >
        <IconCaretLeft/>
      </button>
      <ol
        className="flex gap-2 justify-center items-center flex-wrap"
        role="listbox"
        aria-label="Carousel slide options"
      >
        {data.map((item, index) => (
          <li
            key={keyExtractor(item, index)}
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
              aria-label={labelExtractor(item, index)}
              onClick={() => setCurrentIndex(index)}
            />
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="transition-colors text-xl p-1 text-blue-500 hover:bg-blue-100"
        aria-label="next"
        onClick={() => {
          setCurrentIndex((prev) => {
            if (prev >= data.length - 1) {
              return 0;
            }
            return prev + 1;
          })
        }}
      >
        <IconCaretRight/>
      </button>
    </div>
  )
}