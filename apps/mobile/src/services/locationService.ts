import { getItem } from "../utils/localStorageUtils";
import { AUTH_KEY } from "./authStorage";

const API_URL = import.meta.env.VITE_API_URL;
const authItem = getItem(AUTH_KEY) as {
  token?: string;
  userId?: string;
} | null;

const JWT = authItem?.token;
const driverId = "2e983926-843c-4b03-984d-5549ae1b3806"; // test driver

export const locationService = {
  putCurrentLocation: async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(`${API_URL}/user/location/${driverId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({ latitude: latitude, longitude: longitude }),
      });

      if (!response.ok) {
        throw new Error("Failed to update location");
      }
      console.log("Location updated successfully", await response.json());
    } catch (error) {
      console.error("Error updating location:", error);
    }
  },
};
