import { useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import AuthContext from "./AuthContext";
import { authService } from "../../services/authServices";
import type {
  UserCredentials,
  AuthState,
  LoginResponse,
} from "../../types/authTypes";
import { AUTH_KEY } from "../../services/authStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  role: null,
  loading: false,
  error: null,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authFromStorage, setAuth] = useLocalStorage<AuthState>(
    AUTH_KEY,
    initialState
  );

  const auth: AuthState = authFromStorage ?? initialState;

  const login = useCallback(
    async (credentials: UserCredentials): Promise<boolean> => {
      setAuth((prev) => ({ ...prev, loading: true, error: undefined }));

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
          setAuth(newAuth);
          return true;
        } else {
          setAuth({
            ...initialState,
            error: result.message || "Login failed",
          });
          return false;
        }
      } catch (error: unknown) {
        setAuth({
          ...initialState,
          error: (error as Error).message || "Something went wrong",
        });
        return false;
      }
    },
    [setAuth]
  );

  const logout = useCallback(() => {
    setAuth(initialState);
  }, [setAuth]);

  const value = useMemo(
    () => ({ ...auth, login, logout }),
    [auth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
