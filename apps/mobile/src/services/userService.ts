import type { ApiResult, ApiError } from "../types/apiTypes";
import type { BackendUser } from "../types/userTypes";
import { getItem } from "../utils/localStorageUtils";
import { AUTH_KEY } from "./authStorage";

interface CustomError {
  name?: string;
  message?: string;
  stack?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const getJWTToken = (): string | null => {
  const authUser = getItem(AUTH_KEY) as {
    token?: string;
    name?: string;
    email?: string;
    role?: "driver" | "sender" | "admin";
  } | null;

  return authUser?.token || null;
};

export const userService = {
  async fetchUserById(
    userId: string,
    signal?: AbortSignal
  ): Promise<ApiResult<BackendUser>> {
    try {
      const JWT = getJWTToken();

      if (!JWT) {
        const error: ApiError = {
          success: false,
          message: "No authentication token found",
        };
        return error;
      }

      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        signal,
      });

      if (!response.ok) {
        const message = `Request failed with status ${response.status}`;
        const error: ApiError = {
          success: false,
          message,
        };
        return error;
      }

      const data = await response.json();
      return data as BackendUser;
    } catch (err: unknown) {
      const error = err as CustomError;

      if (
        error?.name === "AbortError" ||
        error?.message?.includes("aborted") ||
        error?.message?.includes("The operation was aborted")
      ) {
        const abortError: ApiError = {
          success: false,
          message: "Request was aborted",
        };
        return abortError;
      }

      const apiError: ApiError = {
        success: false,
        message: error?.message || "Something went wrong while fetching user",
        error: error?.stack,
      };
      return apiError;
    }
  },
};
