import { Button, Text } from "@chas/ui";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { colors } from "@chas/ui";
import StatusCard from "../../components/StatusCard";
import { useState, useEffect } from "react";
import QRModal from "../../components/modals/QRModal";
import { formatDate } from "../../utils/cardUtils";
import type { BackendPackage } from "../../types/packageTypes";
import {
  getStatusIndicators,
  formatTemperature,
} from "../../utils/packageDetailsUtils";
import { packageService } from "../../services/packageService";
import { ClipLoader } from "react-spinners";
import PackageDetailsHeader from "../../components/PackageDetails/PackageDetailsHeader";
import PackageDetails from "../../components/PackageDetails/PackageDetails";

const DriverPackageDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
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
        <Text variant="h2">{error || "No package data available."}</Text>
      </Container>
    );
  }

  const {
    temperature,
    delivered,
    humidity,
    package_id: packageId,
    sender,
    destination,
    arrival_date: arrivalDate,
    thresholds,
  } = packageData;

  const tempValue = Number(temperature);
  const humidityValue = Number(humidity);
  const maxTemp = Number(thresholds.maxTemp);
  const minTemp = Number(thresholds.minTemp);
  const maxHumidity = Number(thresholds.maxHumidity);
  const minHumidity = Number(thresholds.minHumidity);

  const formattedTemp = formatTemperature(temperature);
  const formattedArrivalDate = formatDate(arrivalDate);

  const {
    icon: statusIcon,
    label: statusLabel,
    status: statusStatus,
  } = getStatusIndicators(delivered, tempValue, humidityValue, arrivalDate, {
    maxTemp,
    minTemp,
    maxHumidity,
    minHumidity,
  });

  return (
    <Container className="page">
      <PackageDetailsHeader sender={sender} packageId={packageId} />
      <StatusSection>
        <LeftColumn>
          <StatusCard
            IconName={statusIcon}
            IconSize={100}
            Status={statusStatus}
            Type="indicator"
            label={statusLabel}
            backgroundColor={colors.accent}
          />
        </LeftColumn>
        <RightColumn>
          <StatusCard
            IconName="solidWhiteTemp"
            IconSize="sm"
            label={formattedTemp}
            labelColor="accent"
            Type="temperature"
            backgroundColor={colors.blueLines}
          />
          <StatusCard
            IconName="humidity"
            IconSize="md"
            label={`${humidityValue}%`}
            Type="humidity"
            backgroundColor={colors.secondary}
          />
        </RightColumn>
      </StatusSection>
      <DetailsSection>
        <PackageDetails
          address={destination.address}
          minTemp={minTemp}
          maxTemp={maxTemp}
          minHumidity={minHumidity}
          maxHumidity={maxHumidity}
        />
        <Text> Deliver by: {formattedArrivalDate || "Unknown date"}</Text>
        <Button
          disabled={delivered}
          onClick={() => {
            setShowModal(true);
          }}
        >
          {delivered ? "Package Delivered" : "Show QR Code"}
        </Button>
      </DetailsSection>
      <QRModal
        showModal={showModal}
        closeModal={closeModal}
        qrCodeData={packageId}
      />
    </Container>
  );
};

export default DriverPackageDetails;

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

const StatusSection = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  background-color: ${colors.blueBackground};
  padding: 1rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;
  gap: 1rem;
`;

const DetailsSection = styled.div`
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
