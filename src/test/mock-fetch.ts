const SEARCH_API_URL = "https://search.betashares.services/search";

export interface MockFetchOptions {
  /** Response body to return. Omit to never resolve (permanent loading state). */
  response?: unknown;
  /** Delay in ms before responding. Defaults to 2000. */
  delay?: number;
  /** If set, return an HTTP error response after the delay. */
  error?: { status?: number; message?: string };
}

/**
 * Intercepts fetch calls to the search API with configurable delay,
 * error simulation, and AbortController support.
 *
 * - `mockFetch({ response })` — resolves after `delay` ms (default 2 000)
 * - `mockFetch({ error: { status: 500 } })` — rejects with HTTP error after delay
 * - `mockFetch()` — never resolves (permanent loading), but still abortable
 *
 * Returns a cleanup function that restores the original `window.fetch`.
 */
export function mockFetch(options: MockFetchOptions = {}): () => void {
  const { response, delay = 1000, error } = options;
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    if (url === SEARCH_API_URL) {
      const signal = init?.signal;

      // Respect already-aborted signals
      if (signal?.aborted) {
        throw new DOMException("The operation was aborted.", "AbortError");
      }

      const willResolve = response !== undefined || error;

      // Wait for the configured delay, or hang forever (loading state)
      await new Promise<void>((resolve, reject) => {
        const timer = willResolve ? setTimeout(resolve, delay) : undefined;

        if (signal) {
          signal.addEventListener(
            "abort",
            () => {
              if (timer !== undefined) clearTimeout(timer);
              reject(
                new DOMException("The operation was aborted.", "AbortError")
              );
            },
            { once: true }
          );
        }
      });

      if (error) {
        return new Response(
          JSON.stringify({
            error: error.message ?? "Internal Server Error",
          }),
          {
            status: error.status ?? 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return originalFetch(input, init);
  };

  return () => {
    window.fetch = originalFetch;
  };
}
