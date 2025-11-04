import { useEffect, useState, useCallback } from "react";
import {
  getItem,
  setItem,
  isLocalStorageAvailable,
} from "../utils/localStorageUtils";

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    return getItem<T>(key) ?? initial;
  });

  useEffect(() => {
    setItem<T>(key, state);
  }, [state, key]);

  useEffect(() => {
    if (!isLocalStorageAvailable()) return;

    function onStorage(e: StorageEvent) {
      if (!e.key) return;
      if (e.key !== key) return;
      try {
        const fresh = getItem<T>(key);
        setState(fresh ?? initial);
      } catch {
        setState(initial);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initial]);

  const setStored = useCallback((v: T | ((prev: T) => T)) => {
    setState((prev) =>
      typeof v === "function" ? (v as (p: T) => T)(prev) : v
    );
  }, []);

  return [state, setStored] as const;
}
