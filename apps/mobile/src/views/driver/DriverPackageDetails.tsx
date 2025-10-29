import { Button, Modal, Text } from "@chas/ui";
import { useLocation } from "react-router";
import styled from "styled-components";
import { colors } from "@chas/ui";
import StatusCard from "../../components/StatusCard";
import { useState } from "react";
import QRModal from "../../components/modals/QRModal";
import { formatDate } from "../../utils/cardUtils";

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
    humidity,
    package_id: id,
    sender,
    destination,
    arrival_date: arrivalDate,
    delivered,
    thresholds,
  } = packageData;

  const formattedTemperature = Number.isFinite(Number(temperature))
    ? `${Number(temperature).toFixed(1)}°C`
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
    if (temperature >= thresholds[0]) {
      return {
        icon: "tempWarning" as const,
        label: "Warning",
        status: "Temperature Exceeded",
      };
    }
    if (humidity >= thresholds[1]) {
      return {
        icon: "tempWarning" as const,
        label: "Warnig",
        status: "Humidity Exceeded",
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
          Package ID: {id}
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
          <Text>Address: {destination || "Unknown destination"}</Text>
          <Text> Thresholds:</Text>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Text variant="body-sm">Temperature: {thresholds[0]}°C</Text>
            </li>
            <li>
              <Text variant="body-sm">Humidity: {thresholds[1]}%</Text>
            </li>
          </ul>
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
      <QRModal showModal={showModal} closeModal={closeModal} qrCodeData={id} />
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
