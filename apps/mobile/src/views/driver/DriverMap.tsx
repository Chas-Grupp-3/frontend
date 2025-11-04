import { useLocationContext } from "../../context/location/useLocationContext";
import Map from "../../components/Map/Map";
import { usePackagesContext } from "../../context/packages/usePackagesContext";
import { Marker, Popup } from "react-leaflet";
import {
  greenPinIcon,
  yellowPinIcon,
  redPinIcon,
} from "../../components/Map/MapPinIcons";
import { Text } from "@chas/ui";
import {
  getStatusIndicators,
  formatTemperature,
} from "../../utils/packageDetailsUtils";
import { type BackendPackage } from "../../types/packageTypes";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DriverMap = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useLocationContext();
  const { data } = usePackagesContext();
  console.log("Packages Data:", data);

  // Track current page for each marker
  const [currentPages, setCurrentPages] = useState<Record<string, number>>({});

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }
  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }
  if (!coords) {
    return <div>Getting the location data&hellip; </div>;
  }

  const validPackages = data?.filter(
    (pkg) =>
      pkg.destination &&
      pkg.destination.latitude != null &&
      pkg.destination.longitude != null
  );

  // Group packages by address
  const packagesByAddress = validPackages?.reduce(
    (acc, pkg) => {
      const address = pkg.destination.address;
      if (!acc[address]) {
        acc[address] = [];
      }
      acc[address].push({
        ...pkg,
        lat: pkg.destination!.latitude,
        lng: pkg.destination!.longitude,
      });
      return acc;
    },
    {} as Record<string, Array<BackendPackage & { lat: number; lng: number }>>
  );

  // Create markers with grouped packages
  const markers = packagesByAddress
    ? Object.entries(packagesByAddress).map(([address, packages]) => {
        // Determine the worst status among all packages at this address
        const worstStatus = packages.reduce(
          (worst, pkg) => {
            const { pin } = getStatusIndicators(
              pkg.delivered,
              Number(pkg.temperature),
              Number(pkg.humidity),
              pkg.arrival_date,
              {
                maxTemp: Number(pkg.thresholds.maxTemp),
                minTemp: Number(pkg.thresholds.minTemp),
                maxHumidity: Number(pkg.thresholds.maxHumidity),
                minHumidity: Number(pkg.thresholds.minHumidity),
              }
            );
            if (pin === "red") return "red";
            if (pin === "yellow" && worst !== "red") return "yellow";
            return worst;
          },
          "green" as "red" | "yellow" | "green"
        );

        return {
          address,
          packages,
          lat: packages[0].lat,
          lng: packages[0].lng,
          status: worstStatus,
        };
      })
    : [];

  const handleNextPage = (address: string, totalPages: number) => {
    setCurrentPages((prev) => ({
      ...prev,
      [address]: Math.min((prev[address] || 0) + 1, totalPages - 1),
    }));
  };

  const handlePrevPage = (address: string) => {
    setCurrentPages((prev) => ({
      ...prev,
      [address]: Math.max((prev[address] || 0) - 1, 0),
    }));
  };

  return (
    <div className="page">
      <Map
        latitude={coords.latitude}
        longitude={coords.longitude}
        mapHeight="100%"
        mapWidth="100%"
        truckLatitude={coords.latitude}
        truckLongitude={coords.longitude}
        zoom={15}
        pins={[{ lat: coords.latitude, lng: coords.longitude }]}
      >
        {markers.map((marker, index) => {
          const icon =
            marker.status === "red"
              ? redPinIcon
              : marker.status === "yellow"
                ? yellowPinIcon
                : greenPinIcon;

          const currentPage = currentPages[marker.address] || 0;
          const pkg = marker.packages[currentPage];
          const totalPackages = marker.packages.length;

          const { status } = getStatusIndicators(
            pkg.delivered,
            Number(pkg.temperature),
            Number(pkg.humidity),
            pkg.arrival_date,
            {
              maxTemp: Number(pkg.thresholds.maxTemp),
              minTemp: Number(pkg.thresholds.minTemp),
              maxHumidity: Number(pkg.thresholds.maxHumidity),
              minHumidity: Number(pkg.thresholds.minHumidity),
            }
          );

          return (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={icon}>
              <Popup>
                <div style={{ minWidth: "250px" }}>
                  <Text>Address: {marker.address}</Text>

                  {/* Pagination controls */}
                  {totalPackages > 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                        padding: "8px 0",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <button
                        onClick={() => handlePrevPage(marker.address)}
                        disabled={currentPage === 0}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: currentPage === 0 ? "not-allowed" : "pointer",
                          opacity: currentPage === 0 ? 0.3 : 1,
                          padding: "4px 8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaChevronLeft size={16} />
                      </button>
                      <Text>
                        Package {currentPage + 1} of {totalPackages}
                      </Text>
                      <button
                        onClick={() =>
                          handleNextPage(marker.address, totalPackages)
                        }
                        disabled={currentPage === totalPackages - 1}
                        style={{
                          background: "none",
                          border: "none",
                          cursor:
                            currentPage === totalPackages - 1
                              ? "not-allowed"
                              : "pointer",
                          opacity: currentPage === totalPackages - 1 ? 0.3 : 1,
                          padding: "4px 8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  {/* Package details */}
                  <div>
                    <Text>Package ID: {pkg.package_id}</Text>
                    {status && <Text>Status: {status}</Text>}
                    <Text>
                      Current Temp: {formatTemperature(pkg.temperature)}
                      <br />
                      Current Humidity: {pkg.humidity}%
                    </Text>
                    {pkg.thresholds && (
                      <>
                        <Text>Thresholds:</Text>
                        <Text>
                          Temp: {pkg.thresholds.minTemp}°C -{" "}
                          {pkg.thresholds.maxTemp}°C
                          <br />
                          Humidity: {pkg.thresholds.minHumidity}% -{" "}
                          {pkg.thresholds.maxHumidity}%
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};
export default DriverMap;
