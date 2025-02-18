export type Result<T> = { success: true; data: T } | { success: false; error: unknown };

export function result<T>(cb: () => T): T extends () => Promise<infer R> ? Promise<Result<R>> : Result<T> {
  try {
    const data = cb();

    if (data instanceof Promise) {
      return (
        data
          .then((awaitedData) => ({ success: true, data: awaitedData }))
          .catch((error) => ({ success: false, error }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any
    }

    return {
      success: true,
      data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  } catch (error) {
    return {
      success: false,
      error,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  }
}