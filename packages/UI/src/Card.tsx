import styled from "styled-components";
import { radius, colors, textMobile, textWeb } from "./styles";
import Text from "./font";

type cardType = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  title: string;
  cardType: cardType;
  className: string;
};
const Card = ({ children, title, cardType, className }: Props) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      {title}
      {children}
      {cardType}
      {className}
    </div>
  );
};

export const Card = ({ type = "card", cardType = "primary" }: Props) => {
  const textColor: keyof typeof colors =
    cardType === "primary"
      ? "accent"
      : cardType === "secondary"
        ? "primary"
        : "pause";
  return (
    <MainCard type={type} $cardType={cardType}>
      <Text color={textColor}>{title}</Text>
    </MainCard>
  );
};
const MainCard = styled.card<Props>`
border-radius: ${radius.box};
padding: 10px 10px;
box-shadow: 0 3 3 ${colors.accent};
${({ $cardType }) =>
  $cardType === "primary"
    ? `
    background-color: ${colors.whiteBackground}
  }
`
: $cardType === "secondary"
  ? `
  background-color: ${colors.accent};
 }
`;  

export default Card;
