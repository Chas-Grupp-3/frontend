import { colors, radius } from "./styles";
import Text from "./Text/Text";
import styled from "styled-components";
import { Icon } from "./Icon";

type CardProps = {
  title: string;
  temperature: number;
  DeliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const SmallCard = ({
  title,
  temperature,
  DeliveryStatus,
  ETA,
  id,
  threshold,
}: CardProps) => {
  const getCardColor = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return colors.critical;
    } else if (DeliveryStatus === "late") {
      return `${colors.minor}`;
    } else if (DeliveryStatus === "delivered") {
      return `${colors.pause}`;
    } else {
      return `${colors.ok}`;
    }
  };

  const getStatusText = (
    DeliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return "Temp issues";
    }
    if (DeliveryStatus === "late") {
      return "Late";
    }
    if (DeliveryStatus === "delivered") {
      return "Delivered";
    }
    return "On time";
  };
  return (
    <StyledCard
      style={{
        color: `${colors.cardText}`,
        backgroundColor: getCardColor(DeliveryStatus, temperature, threshold),
      }}
    >
      <StyledText>
        <Text variant="body-smBold">{title}</Text>
        <StyledTemperature>
          <Text variant="h1">
            <Icon name="smallTemp" size="sm" />
            {temperature}°C
          </Text>
        </StyledTemperature>
        <StyledDeliverystatus>
          <Text variant="body-smBold">
            {getStatusText(DeliveryStatus, temperature, threshold)}
          </Text>
        </StyledDeliverystatus>
        <Text variant="body-sm">{ETA}</Text>
        <Text variant="body-sm">ID: {id}</Text>
      </StyledText>
    </StyledCard>
  );
};

export default SmallCard;

const StyledCard = styled.article`
  width: 146px;
  height: 150px;
  padding: 1rem;
  border-radius: ${radius.box};
`;
const StyledText = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledTemperature = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  align-items: center;
  margin-top: 0.5rem;
`;
const StyledDeliverystatus = styled.div`
  margin-top: 0.5rem;
`;
