import type { ApiResult, ApiError } from "../types/apiTypes";
import { getItem } from "../utils/localStorageUtils";
import { AUTH_KEY } from "./authStorage";
import type { BackendPackage } from "../types/packageTypes";

const API_URL = import.meta.env.VITE_API_URL;

const authItem = getItem(AUTH_KEY) as {
  token?: string;
  userId?: string;
} | null;

const JWT = authItem?.token;
const userId = "2e983926-843c-4b03-984d-5549ae1b3806"; // test user

export const packageService = {
  async fetchAllUserPackages(
    signal?: AbortSignal
  ): Promise<ApiResult<BackendPackage[]>> {
    try {
      const response = await fetch(`${API_URL}/packages/${userId}`, {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err?.name === "AbortError" ||
        err?.message?.includes("aborted") ||
        err?.message?.includes("The operation was aborted")
      ) {
        return [] as BackendPackage[];
      }

      const error: ApiError = {
        success: false,
        message: err?.message || "Something went wrong while fetching packages",
        error: err?.stack,
      };
      return error;
    }
  },
  async fetchPackageById(
    packageId: string,
    signal?: AbortSignal
  ): Promise<ApiResult<BackendPackage>> {
    try {
      const response = await fetch(`${API_URL}/packages/${packageId}`, {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (
        err?.name === "AbortError" ||
        err?.message?.includes("aborted") ||
        err?.message?.includes("The operation was aborted")
      ) {
        return {} as BackendPackage;
      }

      const error: ApiError = {
        success: false,
        message: err?.message || "Something went wrong while fetching package",
        error: err?.stack,
      };
      return error;
    }
  },
};
