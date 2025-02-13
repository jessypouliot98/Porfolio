import { assert } from "./assert";
import { isNotDefined } from "./isNotDefined";

export function assertNotDefined<T>(v: T | undefined | null, error?: Error | string): asserts v is undefined | null {
  assert(isNotDefined(v), error ?? "Must be nil");
}