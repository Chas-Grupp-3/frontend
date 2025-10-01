import { SmallCard } from "@chas/ui";
import { LargeCard } from "@chas/ui";

type CardVariant = "small" | "large";

type CardProps = {
  variant?: CardVariant;
  title: string;
  temperature: number;
  DeliveryStatus: "delivered" | "late" | "on time";
  ETA?: string;
  id: string;
  threshold: number;
};

const Card = ({
  variant = "large",
  title,
  temperature,
  DeliveryStatus,
  ETA,
  id,
  threshold,
}: CardProps) => {
  return (
    <div>
      {variant === "large" ? (
        <LargeCard
          title={title}
          temperature={temperature}
          DeliveryStatus={DeliveryStatus}
          ETA={ETA}
          id={id}
          threshold={threshold}
        />
      ) : (
        <SmallCard
          title={title}
          temperature={temperature}
          DeliveryStatus={DeliveryStatus}
          id={id}
          threshold={threshold}
        />
      )}
    </div>
  );
};

export default Card;
