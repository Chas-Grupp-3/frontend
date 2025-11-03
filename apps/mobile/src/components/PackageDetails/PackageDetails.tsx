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
    <Details>
      <Text>Address: {address || "Unknown destination"}</Text>
      <Text> Thresholds:</Text>
      <Text variant="body-sm">
        Temperature: {minTemp}°C - {maxTemp}°C
      </Text>
      <Text variant="body-sm">
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
