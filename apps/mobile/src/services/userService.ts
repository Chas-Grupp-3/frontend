import type { ApiResult, ApiError } from "../types/apiTypes";
import type { BackendUsers } from "../types/packageTypes";
import { getItem } from "../utils/localStorageUtils";
import { AUTH_KEY } from "./authStorage";

interface CustomError {
  name?: string;
  message?: string;
  stack?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const getUser = (key: string) => {
  return getItem(key);
};

const authUser = getUser(AUTH_KEY) as {
  token?: string;
  name?: string;
  email?: string;
  role?: "driver" | "sender" | "admin";
} | null;

const JWT = authUser?.token;
const userId = "42821ea8-ba65-494e-8f82-9b30a26a7310";

export const userService = {
  async fetchAllUsersById(
    signal?: AbortSignal
  ): Promise<ApiResult<BackendUsers[]>> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        signal,
      });

      if (!response.ok) {
        const message = `Request failed with status ${response.status}`;
        const error: ApiError = { success: false, message };
        return error;
      }
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      const error = err as CustomError;
      if (
        error?.name === "AbortError" ||
        error?.message?.includes("aborted") ||
        error?.message?.includes("The operation was aborted")
      ) {
        return [] as BackendUsers[];
      }

      const apiError: ApiError = {
        success: false,
        message: error?.message || "Something went wrong while fetching users",
        error: error?.stack,
      };
      return apiError;
    }
  },
  async fetchUserById(
    userId: string,
    signal?: AbortSignal
  ): Promise<ApiResult<BackendUsers>> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        signal,
      });
      if (!response.ok) {
        const message = `Request failed with status ${response.status}`;
        const error: ApiError = { success: false, message };
        return error;
      }
      const data = await response.json();
      return data;
    } catch (err: unknown) {
      const error = err as CustomError;
      if (
        error?.name === "AbortError" ||
        error?.message?.includes("aborted") ||
        error?.message?.includes("The operation was aborted")
      ) {
        return {} as BackendUsers;
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
