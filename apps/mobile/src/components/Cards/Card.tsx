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
  threshold: number;
  onClick: () => void;
}

const Card = ({
  variant = "large",
  title,
  temperature,
  humidity,
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

  const ariaLabel = `Paket ${title}, temperatur ${temperature} grader${humidity ? `, luftfuktighet ${humidity} procent` : ""}, status ${statusText}${ETA ? `, ankomst ${ETA}` : ""}`;

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
      aria-label={ariaLabel}
      aria-describedby={`card-details-${id}`}
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
      aria-label={ariaLabel}
      aria-describedby={`card-details-${id}`}
    />
  );
};

export default Card;
