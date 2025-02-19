import { sleep } from "./sleep";
import { Result } from "./result";

type Options = Partial<{
  initialDelay: number;
  retryCount: number;
}>
type CallbackParams<T> = {
  next: () => void;
  abort: () => void;
  reject: (reason?: unknown) => void;
  resolve: (value: T) => void;
}
type Callback<T> = (args: CallbackParams<T>) => void;

const SymbolNext = Symbol("next");
const SymbolAbort = Symbol("abort");

const DEFAULTS = {
  initialDelay: 100,
  retryCount: 3,
}

export async function exponentialRetry<T = void>(cb: Callback<T>, opts: Options = {}): Promise<Result<T>> {
  const initialDelay = opts?.initialDelay ?? DEFAULTS.initialDelay;
  const retryCount = opts?.retryCount ?? DEFAULTS.retryCount;

  for (let i = 1; i < retryCount; i++) {
    await sleep(initialDelay * (i ** 2));

    try {
      return {
        success: true,
        data: await new Promise<T>((resolve, reject) => {
          cb({
            resolve,
            reject,
            next: () => reject(SymbolNext),
            abort: () => reject(SymbolAbort),
          });
        }),
      } as const;
    } catch (error) {
      if (error === SymbolAbort) {
        return {
          success: false,
          error: new Error("Aborted"),
        }
      }
      if (error !== SymbolNext) {
        return {
          success: false,
          error,
        };
      }
    }
  }

  return {
    success: false,
    error: new Error("Never resolved"),
  }
}