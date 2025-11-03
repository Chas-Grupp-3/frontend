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
  formattedTemperature,
} from "../../utils/driverPackagesUtils";

const DriverMap = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useLocationContext();
  const { data } = usePackagesContext();
  console.log("Packages Data:", data);

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }
  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }
  if (!coords) {
    return <div>Getting the location data&hellip; </div>;
  }

  const pins = data
    ?.filter(
      (pkg) =>
        pkg.destination &&
        pkg.destination.latitude != null &&
        pkg.destination.longitude != null
    )
    .map((pkg) => ({
      ...pkg,
      lat: pkg.destination!.latitude,
      lng: pkg.destination!.longitude,
    }));

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
        {pins &&
          pins.map((pin, index) => {
            const { pin: pinIcon } = getStatusIndicators(
              pin.delivered,
              Number(pin.temperature),
              Number(pin.humidity),
              pin.arrival_date,
              {
                maxTemp: Number(pin.thresholds.maxTemp),
                minTemp: Number(pin.thresholds.minTemp),
                maxHumidity: Number(pin.thresholds.maxHumidity),
                minHumidity: Number(pin.thresholds.minHumidity),
              }
            );

            const icon =
              pinIcon === "red"
                ? redPinIcon
                : pinIcon === "yellow"
                  ? yellowPinIcon
                  : greenPinIcon;

            return (
              <Marker key={index} position={[pin.lat, pin.lng]} icon={icon}>
                <Popup>
                  <Text>Address: {pin.destination.address}</Text>
                  <Text>
                    Current Temp: {formattedTemperature(pin.temperature)}
                    <br />
                    Current Humidity: {pin.humidity}%
                  </Text>
                  {pin.thresholds && (
                    <>
                      <Text>Thresholds:</Text>
                      <Text>
                        Temp: {pin.thresholds.minTemp}°C -{" "}
                        {pin.thresholds.maxTemp}
                        °C
                        <br />
                        Humidity: {pin.thresholds.minHumidity}% -{" "}
                        {pin.thresholds.maxHumidity}%
                      </Text>
                    </>
                  )}
                </Popup>
              </Marker>
            );
          })}
      </Map>
    </div>
  );
};
export default DriverMap;
