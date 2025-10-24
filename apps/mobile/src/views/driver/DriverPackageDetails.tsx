import { Modal, radius, Text } from "@chas/ui";
import { useLocation } from "react-router";
import styled from "styled-components";
import { colors } from "@chas/ui";
import StatusCard from "../../components/StatusCard";
import encodeQR from "qr";

const DriverPackageDetails = () => {
  const location = useLocation();
  const { packageData } = location.state || {};

  if (!packageData) {
    return (
      <Modal isOpen={true} onClose={() => {}}>
        <Text variant="h2">No package data available.</Text>
      </Modal>
    );
  }
  const { temperature, humidity, package_id: id } = packageData;

  const qrInput = id ?? "";
  let qrSVG = "";
  try {
    qrSVG = encodeQR(String(qrInput), "svg");
  } catch (err) {
    console.error("Failed to generate QR:", err);
    qrSVG = "";
  }

  const formattedTemperature = Number.isFinite(Number(temperature))
    ? `${Number(temperature).toFixed(1)}°C`
    : "N/A";

  return (
    <Container className="page">
      <Header>
        <Text variant="h1" color="accent">
          Sender name
        </Text>
        <Text color="accent" variant="body-sm">
          Package ID: {id}
        </Text>
      </Header>
      <StatusSection>
        <LeftColumn>
          <StatusCard
            IconName="package"
            IconSize={100}
            Status="On time"
            Type="indicator"
            label="Package Status"
            backgroundColor={colors.accent}
          />
        </LeftColumn>
        <RightColumn>
          <StatusCard
            IconName="smallTemp"
            IconSize="md"
            label={formattedTemperature}
            labelColor="accent"
            Type="temperature"
            backgroundColor={colors.blueLines}
          />
          <StatusCard
            IconName="smallTemp"
            IconSize="md"
            label={`${humidity}%`}
            Type="humidity"
            backgroundColor={colors.secondary}
          />
        </RightColumn>
      </StatusSection>
      <DetailsSection>
        <Details>
          <Text>Address</Text>
          <Text> Thresholds:</Text>
          <ul>
            <li>Temperature: {formattedTemperature}</li>
            <li>Humidity: {humidity}%</li>
          </ul>
        </Details>
        <QR>
          {qrSVG ? (
            <img
              width={255}
              height={255}
              src={
                qrSVG.startsWith("data:")
                  ? qrSVG
                  : `data:image/svg+xml;utf8,${encodeURIComponent(qrSVG)}`
              }
              alt={`QR for ${id}`}
            />
          ) : null}
        </QR>
      </DetailsSection>
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

const Details = styled.div``;

const QR = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.blueBackground};
  max-width: fit-content;
  border-radius: ${radius.box};
`;
