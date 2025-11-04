import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { useAuthContext } from "../auth/useAuthContext";
import { locationService } from "../../services/locationService";
import LocationContext, { type LocationCoords } from "./LocationContext";

const POLL_INTERVAL_MS = 60_000; // 1 minute

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthContext();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 5000,
    });

  const intervalRef = useRef<number | null>(null);

  // map react-geolocated coords to a small serializable shape
  const mappedCoords: LocationCoords = useMemo(
    () =>
      coords
        ? { latitude: coords.latitude, longitude: coords.longitude }
        : null,
    [coords]
  );

  const sendCurrentLocation = useCallback(() => {
    if (!mappedCoords) {
      console.warn("No coordinates available to send");
      return;
    }
    // locationService expects strings in current implementation
    locationService.putCurrentLocation(
      mappedCoords.latitude.toString(),
      mappedCoords.longitude.toString()
    );
  }, [mappedCoords]);

  useEffect(() => {
    // Start polling only when user is a driver and geolocation is available/enabled
    if (role === "driver" && isGeolocationAvailable && isGeolocationEnabled) {
      // If we already have coords, send immediately
      if (mappedCoords) {
        sendCurrentLocation();
      }
      // Start interval (if not already started)
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(
          sendCurrentLocation,
          POLL_INTERVAL_MS
        );
        console.info("Location polling started for driver.");
      }
    } else {
      // Stop polling if not a driver or geolocation unavailable/disabled
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.info("Location polling stopped.");
      }
    }

    // Cleanup on unmount or when deps change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.info("Location polling stopped (cleanup).");
      }
    };
    // We depend on the primitive mappedCoords values and flags
  }, [
    role,
    isGeolocationAvailable,
    isGeolocationEnabled,
    mappedCoords,
    sendCurrentLocation,
  ]);

  const contextValue = useMemo(
    () => ({
      coords: mappedCoords,
      isGeolocationAvailable,
      isGeolocationEnabled,
      sendCurrentLocation,
    }),
    [
      mappedCoords,
      isGeolocationAvailable,
      isGeolocationEnabled,
      sendCurrentLocation,
    ]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
