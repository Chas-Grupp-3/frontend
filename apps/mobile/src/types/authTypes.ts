export type UserCredentials = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  token?: string | null;
  userId?: string | null;
  role?: string | null;
  loading: boolean;
  error?: string | null;
  login: (credentials: UserCredentials) => Promise<boolean>;
  logout: () => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  token?: string | null;
  userId?: string | null;
  role?: string | null;
  loading: boolean;
  error?: string | null;
};

export type LoginResponse = {
  userId?: string;
  message: string;
  role?: string;
  token?: string;
  error?: string;
  success?: boolean;
};
