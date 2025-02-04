import { useCarouselData } from "./useCarouselData";
import { clsx } from "clsx";
import { IconCaretLeft, IconCaretRight, IconX } from "../icons";

export type CarouselDotsProps<TData> = {
  className?: string;
  keyExtractor: (key: TData) => string;
}

export function CarouselDots<TData>({ className, keyExtractor }: CarouselDotsProps<TData>) {
  const { data, currentIndex, setCurrentIndex } = useCarouselData<TData>();
  return (
    <div className={clsx(
      "flex items-center justify-center gap-2",
      className,
    )}>
      <button
        type="button"
        className="transition-colors text-xl p-1 text-blue-500 hover:bg-blue-100"
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
      <button
        type="button"
        className="transition-colors text-xl p-1 text-blue-500 hover:bg-blue-100"
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