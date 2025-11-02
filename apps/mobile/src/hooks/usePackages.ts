import { useEffect, useRef, useState, useCallback } from "react";
import { packageService } from "../services/packageService";
import { isApiError } from "../types/apiTypes";
import type { BackendPackage } from "../types/packageTypes";

type UsePackagesOptions = {
  pollIntervalMs?: number | null; // null = no polling
};

type UsePackagesResult = {
  data: BackendPackage[] | null;
  loading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  refresh: () => void;
};

export function usePackages(
  options: UsePackagesOptions = {}
): UsePackagesResult {
  const { pollIntervalMs = null } = options;

  const [data, setData] = useState<BackendPackage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef(true);
  const abortRef = useRef<AbortController | null>(null);
  const hasDataRef = useRef(false); // Track if we have data already

  const isAbortError = (err: unknown): boolean => {
    return (
      (err as Error)?.name === "AbortError" ||
      (err as Error)?.message?.includes("aborted")
    );
  };

  const fetchPackages = useCallback(async () => {
    // Cancel any pending requests
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    // If we already have data, this is a refresh (not initial load)
    if (hasDataRef.current) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const result = await packageService.fetchAllUserPackages(
        controller.signal
      );

      if (isApiError(result)) {
        throw new Error(result.message || "Failed to fetch packages");
      }

      // Only update state if component is still mounted
      if (!mountedRef.current) return;

      setData(result);
      hasDataRef.current = true; // Mark that we now have data
    } catch (err: unknown) {
      if (!mountedRef.current) return;

      // Ignore abort errors - they're intentional
      if (isAbortError(err)) return;

      const errorMessage = err instanceof Error ? err : new Error(String(err));
      setError(errorMessage);
      setData(null);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  const refresh = useCallback(() => {
    void fetchPackages();
  }, [fetchPackages]);

  useEffect(() => {
    mountedRef.current = true;

    // Initial fetch
    void fetchPackages();

    // Setup polling if enabled
    let intervalId: number | undefined;
    if (pollIntervalMs && pollIntervalMs > 0) {
      intervalId = window.setInterval(() => {
        void fetchPackages();
      }, pollIntervalMs);
    }

    // Cleanup
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchPackages, pollIntervalMs]);

  return { data, loading, isRefreshing, error, refresh };
}
