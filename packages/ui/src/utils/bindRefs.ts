import React from "react";
import { isNotDefined } from "@repo/util/src/isNotDefined";

type RefObject<T> = React.Ref<T | null>;
type RefCallback<T> = React.Dispatch<React.SetStateAction<T | null>>;

export function bindRefs<T>(...refs: Array<RefObject<T> | RefCallback<T> | undefined>) {
  return (el: T | null) => {
    for (const ref of refs) {
      if (isNotDefined(ref)) {
        continue;
      }
      if (typeof ref === "function") {
        ref(el);
      } else {
        ref.current = el;
      }
    }
  }
}