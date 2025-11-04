import SmallCard from "./SmallCard";
import LargeCard from "./LargeCard";
import { getCardColor, getStatusText } from "../../utils/cardUtils";

type CardVariant = "small" | "large";

interface CardProps {
  variant?: CardVariant;
  title: string;
  temperature: number;
  humidity?: number;
  deliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  thresholds: {
    minTemp: number;
    maxTemp: number;
    minHumidity: number;
    maxHumidity: number;
  };
  onClick: () => void;
}

const Card = ({
  variant = "large",
  title,
  temperature,
  humidity = 0,
  deliveryStatus,
  ETA,
  id,
  thresholds,
  onClick,
}: CardProps) => {
  const { backgroundColor, textColor } = getCardColor(
    deliveryStatus,
    temperature,
    humidity,
    thresholds.minTemp,
    thresholds.maxTemp,
    thresholds.minHumidity,
    thresholds.maxHumidity
  );

  const statusText = getStatusText(
    deliveryStatus,
    temperature,
    humidity,
    thresholds.minTemp,
    thresholds.maxTemp,
    thresholds.minHumidity,
    thresholds.maxHumidity
  );

  return variant === "large" ? (
    <LargeCard
      title={title}
      temperature={temperature}
      humidity={humidity}
      id={id}
      ETA={ETA}
      backgroundColor={backgroundColor}
      textColor={textColor}
      statusText={statusText}
      onClick={onClick}
    />
  ) : (
    <SmallCard
      title={title}
      temperature={temperature}
      id={id}
      backgroundColor={backgroundColor}
      textColor={textColor}
      statusText={statusText}
      onClick={onClick}
    />
  );
};

export default Card;
