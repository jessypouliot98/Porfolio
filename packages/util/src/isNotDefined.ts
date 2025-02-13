export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return value == undefined;
}