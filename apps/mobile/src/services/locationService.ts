const API_URL = import.meta.env.VITE_API_URL;

export const locationService = {
  putCurrentLocation: async (
    driverId: string,
    latitude: string,
    longitude: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/location/${driverId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: { latitude, longitude } }),
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
