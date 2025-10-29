import type { AuthState } from "../types/authTypes";
import { getItem, setItem, removeItem } from "../utils/localStorageUtils";

export const AUTH_KEY = "auth";

export function getAuth(): AuthState | null {
  return getItem<AuthState>(AUTH_KEY);
}

export function setAuth(auth: AuthState): void {
  setItem<AuthState>(AUTH_KEY, auth);
}

export function clearAuth(): void {
  removeItem(AUTH_KEY);
}
