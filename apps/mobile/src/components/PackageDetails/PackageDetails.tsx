import { Text } from "@chas/ui";
import styled from "styled-components";

interface PackageDetailsProps {
  address: string;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
}
const PackageDetails = ({
  address,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
}: PackageDetailsProps) => {
  return (
    <Details role="region" aria-label="Package delivery information">
      <Text
        aria-label={`Delivery address: ${address || "Unknown destination"}`}
      >
        Address: {address || "Unknown destination"}
      </Text>
      <Text aria-label="Package threshold requirements">Thresholds:</Text>
      <Text
        variant="body-sm"
        aria-label={`Temperature range: ${minTemp} to ${maxTemp} degrees celsius`}
      >
        Temperature: {minTemp}°C - {maxTemp}°C
      </Text>
      <Text
        variant="body-sm"
        aria-label={`Humidity range: ${minHumidity} to ${maxHumidity} percent`}
      >
        Humidity: {minHumidity}% - {maxHumidity}%
      </Text>
    </Details>
  );
};

export default PackageDetails;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
