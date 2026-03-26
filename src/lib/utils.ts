import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom error class for fetch operations
 */
export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
    public url?: string
  ) {
    super(message);
    this.name = "FetchError";
  }
}

/**
 * Performs a fetch with a timeout using AbortController
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 5000
): Promise<Response> {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new FetchError(`Request timed out after ${timeoutMs}ms`, 408, "Request Timeout", url);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Retries a promise with exponential backoff
 */
export function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const attempt = (currentRetry: number): void => {
      Promise.resolve(operation())
        .then(resolve)
        .catch((error: Error) => {
          if (currentRetry >= maxRetries) {
            reject(error);
            return;
          }
          
          const delay = baseDelay * Math.pow(2, currentRetry);
          setTimeout(() => attempt(currentRetry + 1), delay);
        });
    };
    
    attempt(0);
  });
}
