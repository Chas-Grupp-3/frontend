import { Text, Button } from "@chas/ui";
import { useLocation, useNavigate, useParams } from "react-router";
import StatusCard from "../../components/StatusCard";
import styled from "styled-components";
import { colors } from "@chas/ui";
import { formatDate } from "../../utils/cardUtils";
import type { BackendPackage } from "../../types/packageTypes";
import Map from "../../components/Map/Map";
import { useLocationContext } from "../../context/location/useLocationContext";
import { packageService } from "../../services/packageService";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import PackageDetailsHeader from "../../components/PackageDetails/PackageDetailsHeader";
import { formatTemperature } from "../../utils/packageDetailsUtils";
import PackageDetails from "../../components/PackageDetails/PackageDetails";

const UserPackageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useLocationContext();

  // Initialize with state data if available, otherwise null
  const [packageData, setPackageData] = useState<BackendPackage | null>(
    location.state?.packageData || null
  );
  const [loading, setLoading] = useState(!location.state?.packageData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const result = await packageService.fetchPackageById(id);

        if ("success" in result && !result.success) {
          setError(result.message || "Failed to fetch package");
          setPackageData(null);
        } else {
          setPackageData(result as BackendPackage);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }
  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }
  if (!coords) {
    return <div>Getting the location data&hellip; </div>;
  }

  if (loading) {
    return (
      <Container className="page">
        <LoadingContainer>
          <ClipLoader size={64} color={colors.primary} />
          <Text>Loading package details...</Text>
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !packageData) {
    return (
      <Container className="page">
        <ErrorContainer>
          <Text variant="h2">{error || "No package data available."}</Text>
        </ErrorContainer>
      </Container>
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
    delivered,
  } = packageData;

  const formattedTemperature = formatTemperature(temperature);

  const formattedArrivalDate = formatDate(arrivalDate);

  const handleClick = () => {
    navigate(`/user/scan/deliver/${packageId}`);
  };

  return (
    <Container className="page">
      <PackageDetailsHeader sender={sender} packageId={packageId} />
      <MapSection>
        {delivered ? (
          <TextSection>
            <Text>Package has been delivered</Text>
          </TextSection>
        ) : (
          <Map
            latitude={coords.latitude}
            longitude={coords.longitude}
            mapHeight="16rem"
            mapWidth="100%"
            truckLatitude={packageLocation.latitude}
            truckLongitude={packageLocation.longitude}
            zoom={16}
          />
        )}
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
        <PackageDetails
          address={destination.address}
          minTemp={Number(thresholds.minTemp)}
          maxTemp={Number(thresholds.maxTemp)}
          minHumidity={Number(thresholds.minHumidity)}
          maxHumidity={Number(thresholds.maxHumidity)}
        />
        <Text> Latest arrival: {formattedArrivalDate || "Unknown date"}</Text>
        <Button disabled={delivered} onClick={handleClick}>
          {delivered
            ? "Package Delivered"
            : "Open QR scanner to mark as delivered"}
        </Button>
      </DetailsSection>
    </Container>
  );
};

export default UserPackageDetails;

const Container = styled.div`
  background-color: ${colors.background};
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
`;

const MapSection = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  background-color: ${colors.blueBackground};
  border-bottom: 2px solid ${colors.secondary};
  min-height: 16rem;
`;
const TextSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
