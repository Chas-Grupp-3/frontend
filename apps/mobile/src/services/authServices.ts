import type { LoginResponse, UserCredentials } from "../types/authTypes";

const API_URL = import.meta.env.VITE_API_URL;

// Backend response shape
interface BackendLoginResponse {
  id: string;
  token?: string;
  role?: string;
  message: string;
}

export const authService = {
  async login(credentials: UserCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data: Partial<BackendLoginResponse> = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
          error: data.message || "Login failed",
        };
      }

      return {
        success: true,
        userId: data.id,
        token: data.token,
        role: data.role,
        message: data.message || "Login successful",
      };
    } catch (err: unknown) {
      const message = (err as Error).message || "Something went wrong";
      return {
        success: false,
        message,
        error: message,
      };
    }
  },
};
