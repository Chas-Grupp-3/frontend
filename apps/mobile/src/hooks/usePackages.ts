import { useEffect, useRef, useState, useCallback } from "react";
import { mapBackendPackageToCardInfo } from "../utils/cardUtils";
import { packageService } from "../services/packageService";
import { isApiError } from "../types/apiTypes";
import type { CardInfo, BackendPackage } from "../types/packageTypes";

type UsePackagesOptions = {
  pollIntervalMs?: number | null; // null = no polling
  defaultThreshold?: number;
};

type UsePackagesResult = {
  mappedData: CardInfo[] | null;
  data: BackendPackage[] | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
};

export function usePackages(
  options: UsePackagesOptions = {}
): UsePackagesResult {
  const { pollIntervalMs = null, defaultThreshold = 5 } = options;

  const [mappedData, setMappedData] = useState<CardInfo[] | null>(null);
  const [data, setData] = useState<BackendPackage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mountedRef = useRef(true);
  const abortRef = useRef<AbortController | null>(null);

  const fetchAndMap = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await packageService.fetchAllUserPackages(
        controller.signal
      );

      if (isApiError(result)) {
        throw new Error(result.message || "Failed to fetch packages");
      }

      const mapped = result.map((pkg: BackendPackage) =>
        mapBackendPackageToCardInfo(pkg, { defaultThreshold })
      );

      if (!mountedRef.current) return;
      setMappedData(mapped);
      setData(result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (!mountedRef.current) return;

      if (err?.name === "AbortError" || err?.message?.includes("aborted"))
        return;

      setError(err instanceof Error ? err : new Error(String(err)));
      setMappedData(null);
      setData(null);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [defaultThreshold]);

  const refresh = useCallback(() => {
    void fetchAndMap();
  }, [fetchAndMap]);

  useEffect(() => {
    mountedRef.current = true;
    void fetchAndMap();

    let intervalId: number | undefined;

    if (pollIntervalMs && pollIntervalMs > 0) {
      intervalId = window.setInterval(() => {
        void fetchAndMap();
      }, pollIntervalMs);
    }

    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchAndMap, pollIntervalMs]);

  return { mappedData, data, loading, error, refresh };
}
