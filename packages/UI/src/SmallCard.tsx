import { colors, radius } from "./styles";
import Text from "./Text/Text";
import styled from "styled-components";
import { Icon } from "./Icon";

type CardProps = {
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const SmallCard = ({
  title,
  temperature,
  deliveryStatus,
  ETA,
  id,
  threshold,
}: CardProps) => {
  const getCardColor = (
    deliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return {
        backgroundColor: colors.critical,
        textColor: "accent",
      };
    } else if (deliveryStatus === "late") {
      return { backgroundColor: colors.minor, textColor: "cardText" };
    } else if (deliveryStatus === "delivered") {
      return { backgroundColor: colors.pause, textColor: "cardText" };
    } else {
      return { backgroundColor: colors.ok, textColor: "cardText" };
    }
  };

  const getStatusText = (
    deliveryStatus: "delivered" | "late" | "on time",
    temperature: number,
    threshold: number
  ) => {
    if (temperature >= threshold) {
      return "Temp issues";
    }
    if (deliveryStatus === "late") {
      return "Late";
    }
    if (deliveryStatus === "delivered") {
      return "Delivered";
    }
    return "On time";
  };

  const { backgroundColor, textColor } = getCardColor(
    deliveryStatus,
    temperature,
    threshold
  );
  return (
    <StyledCard
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <StyledText>
        <Text variant="body-smBold" color={textColor}>
          {title}
        </Text>
        <StyledTemperature>
          <Icon name="smallTemp" size="sm" />
          <Text variant="h1">{temperature}°C</Text>
        </StyledTemperature>
        <StyledDeliverystatus>
          <Text variant="body-smBold">
            {getStatusText(deliveryStatus, temperature, threshold)}
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
