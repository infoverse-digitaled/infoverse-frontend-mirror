import { AxiosError } from 'axios';

/**
 * Extracts a user-facing message from an API error, falling back to a
 * default when the shape is unexpected. Backend errors are typically
 * shaped as either `{ error: { message } }` or `{ message }`.
 */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as
      | { error?: { message?: string } | string; message?: string }
      | undefined;
    const message =
      (typeof data?.error === 'string' ? data.error : data?.error?.message) ?? data?.message;
    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
  }
  return fallback;
}
