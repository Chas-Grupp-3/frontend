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

const LargeCard = ({
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
      <div style={styles.cardBox}>
        <div style={styles.leftColumn}>
          <Text variant="body-smBold">{title}</Text>
          <div style={styles.tempBox}>
            <Icon name="smallTemp" size="sm" />
            <Text variant="h1">{temperature}°</Text>
          </div>
        </div>
        <div style={styles.rightColumn}>
          <Text variant="body-smBold">
            {getStatusText(DeliveryStatus, temperature, threshold)}
          </Text>
          <Text variant="body-sm">ETA: {ETA}</Text>
          <Text variant="body-sm">ID: {id}</Text>
        </div>
      </div>
    </StyledCard>
  );
};

export default LargeCard;

const StyledCard = styled.article`
  width: "348px";
  height: "78x";
  padding: "1rem";
  border-radius: ${radius.box};
`;
const styles = {
  cardBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  tempBox: {
    display: "flex",
    flexDirection: "row",
    gap: "0.2rem",
    alignItems: "center",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
  },
};
