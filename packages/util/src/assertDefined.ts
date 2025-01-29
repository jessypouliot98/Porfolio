import { assert } from "./assert";

export function assertDefined<T>(v: T | undefined | null, error?: Error | string): asserts v is T {
  assert(v != undefined, error ?? "Must be defined");
}