export const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
};

export function getItem<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    // remove corrupted key to allow recovery
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in client; optionally log in dev
  }
}

export function removeItem(key: string): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
