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

  const formattedTemperature = Number.isFinite(Number(temperature))
    ? `${Number(temperature).toFixed(1)}°C`
    : "N/A";
  const formattedArrivalDate = formatDate(arrivalDate);
  const formattedMaxTemp = Number(thresholds.maxTemp).toFixed(1);
  const formattedMinTemp = Number(thresholds.minTemp).toFixed(1);
  const formattedMaxHumidity = Number(thresholds.maxHumidity).toFixed(1);
  const formattedMinHumidity = Number(thresholds.minHumidity).toFixed(1);

  const bigCardData = () => {
    if (delivered) {
      return {
        icon: "package" as const,
        label: "Delivered",
        status: undefined,
      };
    }
    if (temperature >= formattedMaxTemp) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Temperature Exceeded",
      };
    }
    if (humidity >= formattedMaxHumidity) {
      return {
        icon: "tempWarning" as const,
        label: "Warnig",
        status: "Humidity Exceeded",
      };
    }
    if (temperature <= formattedMinTemp) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Temperature Below Minimum",
      };
    }
    if (humidity <= formattedMinHumidity) {
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
      icon: "truck" as const,
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
            label={`${humidity}%`}
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
            Temperature: {thresholds.minTemp}°C - {thresholds.maxTemp}°C
          </Text>
          <Text variant="body-sm">
            Humidity: {thresholds.minHumidity}% - {thresholds.maxHumidity}%
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
