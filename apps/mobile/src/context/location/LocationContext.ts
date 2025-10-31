import { createContext } from "react";

export type LocationCoords = { latitude: number; longitude: number } | null;

export type LocationContextType = {
  coords: LocationCoords;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  sendCurrentLocation: () => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export default LocationContext;
