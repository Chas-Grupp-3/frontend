import styled, { css } from "styled-components";
import Card from "./Card";
import { radius, colors } from "@chas/ui";
import { type CardInfo } from "../../types/packageTypes";

type CardListProps = {
  cards: CardInfo[];
  onCardClick?: (id: string) => void;
  variant?: "small" | "large";
};

interface ListVariantStyles {
  $variant: "small" | "large";
}

const listVariantsConfig = {
  large: css`
    flex: 1 1 100%;
    max-width: 100%;
  `,

  small: css`
    flex: 0 0 calc(50% - 0.5rem);
  `,
};

const CardList = ({ cards, onCardClick, variant = "small" }: CardListProps) => {
  return (
    <StyledCardListContainer>
      <StyledCardList>
        {cards.map((item) => (
          <StyledLi key={item.id} $variant={variant}>
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
          </StyledLi>
        ))}
      </StyledCardList>
    </StyledCardListContainer>
  );
};

export default CardList;

const StyledCardListContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border-radius: ${radius.box};
  border: solid 0.5px ${colors.greyText};
  box-shadow: inset 0 4px 10px ${colors.greyText};
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
`;

const StyledCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li<ListVariantStyles>`
  display: flex;
  justify-content: center;
  ${({ $variant }) => listVariantsConfig[$variant || "small"]}
`;
