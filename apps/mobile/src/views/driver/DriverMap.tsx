import { useGeolocated } from "react-geolocated";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Icon } from "@chas/ui";
import ReactDOMServer from "react-dom/server";
import { locationService } from "../../services/locationService";

const DriverMap = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }
  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }
  if (!coords) {
    return <div>Getting the location data&hellip; </div>;
  }

  const iconHtml = ReactDOMServer.renderToStaticMarkup(
    <Icon name="truck" size="md" />
  );

  const markerIcon = L.divIcon({
    html: iconHtml,
    className: "my-leaflet-div-icon", // override default .leaflet-div-icon styling as needed
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const updateLocation = () => {
    if (coords) {
      locationService.putCurrentLocation(
        "2e983926-843c-4b03-984d-5549ae1b3806",
        coords.latitude.toString(),
        coords.longitude.toString()
      );
    }
  };
  // setInterval(updateLocation, 60000); // Update location every 60 seconds

  return (
    <div className="page">
      <button onClick={updateLocation}>Update Location</button>
      <MapContainer
        center={[coords.latitude, coords.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[coords.latitude, coords.longitude]}
          icon={markerIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>{" "}
    </div>
  );
};
export default DriverMap;
