import SmallCard from "./SmallCard";
import LargeCard from "./LargeCard";
import { getCardColor, getStatusText } from "../../utils/cardUtils";

type CardVariant = "small" | "large";

interface CardProps {
  variant?: CardVariant;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
  onClick: () => void;
}

const Card = ({
  variant = "large",
  title,
  temperature,
  deliveryStatus,
  ETA,
  id,
  threshold,
  onClick,
}: CardProps) => {
  const { backgroundColor, textColor } = getCardColor(
    deliveryStatus,
    temperature,
    threshold
  );

  const statusText = getStatusText(deliveryStatus, temperature, threshold);

  return variant === "large" ? (
    <LargeCard
      title={title}
      temperature={temperature}
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
