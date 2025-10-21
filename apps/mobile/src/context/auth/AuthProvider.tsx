import { useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import AuthContext from "./AuthContext";
import { authService } from "../../services/authServices";
import type {
  UserCredentials,
  AuthState,
  LoginResponse,
} from "../../types/authTypes";

const STORAGE_KEY = "auth";

const initialState: AuthState = {
  isAuthenticated: false,
  token: undefined,
  userId: undefined,
  role: undefined,
  loading: false,
  error: undefined,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  const persistAuth = useCallback((newAuth: AuthState) => {
    setAuth(newAuth);
    if (newAuth.isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (credentials: UserCredentials): Promise<boolean> => {
      persistAuth({ ...auth, loading: true, error: undefined });

      try {
        const result: LoginResponse = await authService.login(credentials);
        const isSuccess = !!result.token && !!result.userId;

        if (isSuccess) {
          const newAuth: AuthState = {
            isAuthenticated: true,
            token: result.token,
            userId: result.userId,
            role: result.role,
            loading: false,
            error: undefined,
          };
          persistAuth(newAuth);
          return true;
        } else {
          persistAuth({
            ...initialState,
            error: result.message || "Login failed",
          });
          return false;
        }
      } catch (error: unknown) {
        persistAuth({
          ...initialState,
          error: (error as Error).message || "Something went wrong",
        });
        return false;
      }
    },
    [auth, persistAuth]
  );

  const logout = useCallback(() => {
    persistAuth(initialState);
  }, [persistAuth]);

  const value = useMemo(
    () => ({ ...auth, login, logout }),
    [auth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
