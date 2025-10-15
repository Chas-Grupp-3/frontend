import styled from "styled-components";
import Card from "./Card";
import { radius, colors } from "@chas/ui";

export type CardInfo = {
  id: number;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "on time" | "late";
  ETA?: string;
  packageId: string;
  threshold: number;
};

type CardListProps = {
  cards: CardInfo[];
  onCardClick?: (id: string) => void;
  variant?: "small" | "large";
};

const CardList = ({ cards, onCardClick, variant = "small" }: CardListProps) => {
  return (
    <StyledBox>
      <ul>
        {cards.map((item) => (
          <li key={item.id}>
            <Card
              variant={variant}
              title={item.title}
              temperature={item.temperature}
              deliveryStatus={item.deliveryStatus}
              ETA={item.ETA}
              id={item.packageId}
              threshold={item.threshold}
              onClick={() => onCardClick?.(item.packageId)}
            />
          </li>
        ))}
      </ul>
    </StyledBox>
  );
};

export default CardList;

const StyledBox = styled.section`
  width: 340px;
  height: 340px;
  padding: 1rem;
  border-radius: ${radius.box};
  border: solid 0.5px ${colors.greyText};
  box-shadow: inset 0 4px 10px ${colors.greyText};
  overflow: auto;
  margin-top: 2rem;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.3rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    flex: 0 0 calc(50% - 0.5rem);
  }
`;
