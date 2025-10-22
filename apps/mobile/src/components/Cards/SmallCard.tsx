import styled from "styled-components";
import { Icon, Text, colors, radius } from "@chas/ui";

interface CardProps {
  title: string;
  temperature: number;
  ETA?: string;
  id: string;
  backgroundColor: string;
  textColor: keyof typeof colors;
  statusText: string;
  onClick: () => void;
}

const SmallCard = ({
  title,
  temperature,
  ETA,
  id,
  backgroundColor,
  textColor,
  statusText,
  onClick,
  ...rest
}: CardProps) => {
  return (
    <StyledCard
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
      {...rest}
    >
      <Text variant="body-smBold" color={textColor}>
        {title}
      </Text>
      <StyledTemperature>
        <Icon name="smallTemp" size="sm" />
        <Text variant="h1" color={textColor}>
          {temperature}°C
        </Text>
      </StyledTemperature>
      <StyledDeliverystatus>
        <Text variant="body-smBold" color={textColor}>
          {statusText}
        </Text>
      </StyledDeliverystatus>
      <Text variant="body-sm" color={textColor}>
        {ETA}
      </Text>
      <Text variant="body-sm" color={textColor}>
        ID: {id}
      </Text>
    </StyledCard>
  );
};

export default SmallCard;

const StyledCard = styled.article`
  min-width: 146px;
  height: 150px;
  padding: 1rem;
  border-radius: ${radius.box};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledTemperature = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  align-items: center;
  margin-top: 0.5rem;
`;
const StyledDeliverystatus = styled.div`
  margin-top: 0.5rem;
`;
