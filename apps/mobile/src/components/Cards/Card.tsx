import SmallCard from "./SmallCard";
import LargeCard from "./LargeCard";
import { getCardColor, getStatusText } from "../../utils/cardUtils";
import type { CardInfo } from "../../types/packageTypes";

type CardVariant = "small" | "large";

interface CardProps {
  variant?: CardVariant;
  card: CardInfo;
  onClick: () => void;
}

const Card = ({ variant = "large", card, onClick }: CardProps) => {
  const { backgroundColor, textColor } = getCardColor(card);
  const statusText = getStatusText(card);

  return variant === "large" ? (
    <LargeCard
      title={card.title}
      temperature={card.temperature}
      humidity={card.humidity}
      id={card.packageId}
      ETA={card.ETA}
      backgroundColor={backgroundColor}
      textColor={textColor}
      statusText={statusText}
      onClick={onClick}
    />
  ) : (
    <SmallCard
      title={card.title}
      temperature={card.temperature}
      id={card.packageId}
      backgroundColor={backgroundColor}
      textColor={textColor}
      statusText={statusText}
      onClick={onClick}
    />
  );
};

export default Card;
