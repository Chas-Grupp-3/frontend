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

const LargeCard = ({
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
      return colors.critical;
    } else if (deliveryStatus === "late") {
      return `${colors.minor}`;
    } else if (deliveryStatus === "delivered") {
      return `${colors.pause}`;
    } else {
      return `${colors.ok}`;
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
  return (
    <StyledCard
      style={{
        color: `${colors.cardText}`,
        backgroundColor: getCardColor(deliveryStatus, temperature, threshold),
      }}
    >
      <StyledInfo>
        <Text variant="body-smBold">{title}</Text>
        <StyledDeliveryStatus>
          <Text variant="body-smBold">
            {getStatusText(deliveryStatus, temperature, threshold)}
          </Text>
        </StyledDeliveryStatus>
      </StyledInfo>
      <StyledContent>
        <StyledLeftColumn>
          <Icon name="smallTemp" size="sm" />
          <Text variant="h1">{temperature}°</Text>
        </StyledLeftColumn>
        <StyledRightColumn>
          <Text variant="body-sm">ETA: {ETA}</Text>
          <Text variant="body-sm">ID: {id}</Text>
        </StyledRightColumn>
      </StyledContent>
    </StyledCard>
  );
};

export default LargeCard;

const StyledCard = styled.article`
  width: 348px;
  height: 78px;
  padding: 1rem;
  border-radius: ${radius.box};
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const StyledDeliveryStatus = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  padding: 2px 6px;
`;
const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3;
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  align-items: center;
`;
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3;
`;
