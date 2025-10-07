import SmallCard from "./SmallCard";
import LargeCard from "./LargeCard";
import { colors } from "../styles";

type CardVariant = "small" | "large";

interface CardProps {
  variant?: CardVariant;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
}

export const Card = ({
  variant = "large",
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
        textColor: "accent" as keyof typeof colors,
      };
    } else if (deliveryStatus === "late") {
      return {
        backgroundColor: colors.minor,
        textColor: "cardText" as keyof typeof colors,
      };
    } else if (deliveryStatus === "delivered") {
      return {
        backgroundColor: colors.pause,
        textColor: "cardText" as keyof typeof colors,
      };
    } else {
      return {
        backgroundColor: colors.ok,
        textColor: "cardText" as keyof typeof colors,
      };
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

  const statusText = getStatusText(deliveryStatus, temperature, threshold);

  return (
    <div>
      {variant === "large" ? (
        <LargeCard
          title={title}
          temperature={temperature}
          id={id}
          ETA={ETA}
          backgroundColor={backgroundColor}
          textColor={textColor}
          statusText={statusText}
        />
      ) : (
        <SmallCard
          title={title}
          temperature={temperature}
          id={id}
          backgroundColor={backgroundColor}
          textColor={textColor}
          statusText={statusText}
        />
      )}
    </div>
  );
};
