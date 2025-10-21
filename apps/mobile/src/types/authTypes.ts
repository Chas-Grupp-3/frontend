export type UserCredentials = {
  email: string;
  password: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  token?: string;
  userId?: string;
  role?: string;
  loading: boolean;
  error?: string;
  login: (credentials: UserCredentials) => Promise<boolean>;
  logout: () => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  token?: string;
  userId?: string;
  role?: string;
  loading: boolean;
  error?: string;
};

export type LoginResponse = {
  userId?: string;
  message: string;
  role?: string;
  token?: string;
  error?: string;
  success?: boolean;
};
