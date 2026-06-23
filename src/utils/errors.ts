import { AxiosError } from 'axios';

export function isOfflineError(error: unknown): boolean {
  return error instanceof AxiosError && error.response === undefined;
}

export function getErrorMessage(error: unknown): string {
  if (isOfflineError(error)) {
    return 'You appear to be offline. Check your connection and try again.';
  }
  if (error instanceof AxiosError) {
    return error.message || 'Something went wrong.';
  }
  return 'Something went wrong.';
}
