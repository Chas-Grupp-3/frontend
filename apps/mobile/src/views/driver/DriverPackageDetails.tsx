import { Button, Modal, Text } from "@chas/ui";
import { useLocation } from "react-router";
import styled from "styled-components";
import { colors } from "@chas/ui";
import StatusCard from "../../components/StatusCard";
import { useState } from "react";
import QRModal from "../../components/modals/QRModal";
import { formatDate } from "../../utils/cardUtils";
import type { BackendPackage } from "../../types/packageTypes";

const DriverPackageDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const location = useLocation();
  const { packageData } = location.state || {};

  if (!packageData) {
    return (
      <Modal isOpen={true} onClose={() => {}}>
        <Text variant="h2">No package data available.</Text>
      </Modal>
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
  } = packageData as BackendPackage;

  // Convert to numbers for comparison
  const tempValue = Number(temperature);
  const humidityValue = Number(humidity);
  const maxTemp = Number(thresholds.maxTemp);
  const minTemp = Number(thresholds.minTemp);
  const maxHumidity = Number(thresholds.maxHumidity);
  const minHumidity = Number(thresholds.minHumidity);

  const formattedTemperature = Number.isFinite(tempValue)
    ? `${tempValue.toFixed(1)}°C`
    : "N/A";
  const formattedArrivalDate = formatDate(arrivalDate);

  const bigCardData = () => {
    if (delivered) {
      return {
        icon: "package" as const,
        label: "Delivered",
        status: undefined,
      };
    }
    if (tempValue >= maxTemp) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Temperature Exceeded",
      };
    }
    if (humidityValue >= maxHumidity) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Humidity Exceeded",
      };
    }
    if (tempValue <= minTemp) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Temperature Below Minimum",
      };
    }
    if (humidityValue <= minHumidity) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Humidity Below Minimum",
      };
    }
    if (!delivered && arrivalDate < new Date().toISOString()) {
      return {
        icon: "clock" as const,
        label: "Late",
        status: "Delivery Overdue",
      };
    }
    return {
      icon: "truckRight" as const,
      label: "On Time",
      status: undefined,
    };
  };

  return (
    <Container className="page">
      <Header>
        <Text variant="h1" color="accent">
          {sender || "Unknown Sender"}
        </Text>
        <Text color="accent" variant="body-sm">
          Package ID: {packageId}
        </Text>
      </Header>
      <StatusSection>
        <LeftColumn>
          <StatusCard
            IconName={bigCardData().icon}
            IconSize={100}
            Status={bigCardData().status}
            Type="indicator"
            label={bigCardData().label}
            backgroundColor={colors.accent}
          />
        </LeftColumn>
        <RightColumn>
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
            label={`${humidityValue}%`}
            Type="humidity"
            backgroundColor={colors.secondary}
          />
        </RightColumn>
      </StatusSection>
      <DetailsSection>
        <Details>
          <Text>Address: {destination.address || "Unknown destination"}</Text>
          <Text> Thresholds:</Text>
          <Text variant="body-sm">
            Temperature: {minTemp}°C - {maxTemp}°C
          </Text>
          <Text variant="body-sm">
            Humidity: {minHumidity}% - {maxHumidity}%
          </Text>
        </Details>
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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
