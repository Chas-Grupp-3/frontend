import { Icon, Text } from "@chas/ui";
import { useLocation } from "react-router";
import StatusCard from "../../components/StatusCard";
import styled from "styled-components";
import { colors } from "@chas/ui";
import { formatDate } from "../../utils/cardUtils";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { BackendPackage } from "../../types/packageTypes";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

const UserPackageDetails = () => {
  const location = useLocation();
  const { packageData } = location.state || {};
  console.log("Package Data:", packageData);
  if (!packageData) {
    return (
      <div>
        <Text variant="h2">No package data available.</Text>
      </div>
    );
  }
  const {
    temperature,
    humidity,
    package_id: packageId,
    sender,
    destination,
    arrival_date: arrivalDate,
    thresholds,
    location: packageLocation,
  } = packageData as BackendPackage;

  const formattedTemperature = Number.isFinite(Number(temperature))
    ? `${Number(temperature).toFixed(1)}°C`
    : "N/A";
  const formattedArrivalDate = formatDate(arrivalDate);

  const iconHtml = ReactDOMServer.renderToStaticMarkup(
    <Icon name="truck" size="md" />
  );

  const markerIcon = L.divIcon({
    html: iconHtml,
    className: "my-leaflet-div-icon", // override default .leaflet-div-icon styling as needed
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
  return (
    <Container className="page">
      <Header>
        <Text variant="h1" color="accent">
          {sender || "Unknown Sender"}
        </Text>
      </Header>
      <MapSection>
        <MapContainer
          center={[packageLocation.latitude, packageLocation.longitude]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: "16rem", width: "100%", overflow: "hidden" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[packageLocation.latitude, packageLocation.longitude]}
            icon={markerIcon}
          ></Marker>
        </MapContainer>
      </MapSection>
      <DetailsSection>
        <StatusCardRow>
          <StatusCard
            IconName="solidWhiteTemp"
            IconSize="sm"
            label={formattedTemperature}
            labelColor="accent"
            Type="temperature"
            backgroundColor={colors.blueLines}
          />
          <StatusCard
            IconName="humidity"
            IconSize="md"
            label={`${humidity}%`}
            Type="humidity"
            backgroundColor={colors.secondary}
          />
        </StatusCardRow>
        <Details>
          <Text>Address: {destination.address || "Unknown destination"}</Text>
          <Text> Thresholds:</Text>
          <Text variant="body-sm">
            Temperature: {thresholds.minTemp}°C - {thresholds.maxTemp}°C
          </Text>
          <Text variant="body-sm">
            Humidity: {thresholds.minHumidity}% - {thresholds.maxHumidity}%
          </Text>
        </Details>
        <Text> Latest arrival: {formattedArrivalDate || "Unknown date"}</Text>
      </DetailsSection>
    </Container>
  );
};

export default UserPackageDetails;

const Container = styled.div`
  background-color: ${colors.background};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  padding-top: 4rem;
  padding-bottom: 2rem;
  background-color: ${colors.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;
const MapSection = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  background-color: ${colors.blueBackground};
  border-bottom: 2px solid ${colors.secondary};
`;

const StatusCardRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const DetailsSection = styled.div`
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
