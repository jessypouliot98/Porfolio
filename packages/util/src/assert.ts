export function assert(value: unknown, error: Error | string): asserts value {
  if (value === false) {
    throw (error instanceof Error) ? error : new Error(error);
  }
}