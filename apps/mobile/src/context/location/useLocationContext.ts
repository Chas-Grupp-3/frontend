import { useContext } from "react";
import type { LocationContextType } from "./LocationContext";
import LocationContext from "./LocationContext";

export const useLocationContext = (): LocationContextType => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return ctx;
};
