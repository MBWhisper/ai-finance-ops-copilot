import * as Sentry from '@sentry/nextjs';

type AsyncFn<T> = (...args: never[]) => Promise<T>;

export async function withErrorCapture<T>(
  fn: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    Sentry.captureException(error, {
      extra: context,
    });
    return { data: null, error };
  }
}

export function captureMessage(message: string, context?: Record<string, unknown>) {
  Sentry.captureMessage(message, {
    extra: context,
  });
}
