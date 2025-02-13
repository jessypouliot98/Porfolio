import { assert } from "./assert";
import { isDefined } from "./isDefined";

export function assertDefined<T>(v: T | undefined | null, error?: Error | string): asserts v is T {
  assert(isDefined(v), error ?? "Must be defined");
}