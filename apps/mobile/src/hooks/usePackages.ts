import { useEffect, useRef, useState, useCallback } from "react";
import { packageService } from "../services/packageService";
import { isApiError } from "../types/apiTypes";
import type { BackendPackage } from "../types/packageTypes";

type UsePackagesOptions = {
  pollIntervalMs?: number | null;
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
  const hasDataRef = useRef(false);

  const isAbortError = (err: unknown): boolean => {
    return (
      (err as Error)?.name === "AbortError" ||
      (err as Error)?.message?.includes("aborted")
    );
  };

  const fetchPackages = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

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

      if (!mountedRef.current) return;

      setData(result);
      hasDataRef.current = true;
    } catch (err: unknown) {
      if (!mountedRef.current) return;

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

    void fetchPackages();

    let intervalId: number | undefined;
    if (pollIntervalMs && pollIntervalMs > 0) {
      intervalId = window.setInterval(() => {
        void fetchPackages();
      }, pollIntervalMs);
    }

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
