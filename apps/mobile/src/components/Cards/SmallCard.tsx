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
      role="article"
      aria-label={`Package ${title}, temperature ${temperature} degrees, status ${statusText}`}
      tabIndex={0}
      aria-describedby={`small-card-content-${id}`}
    >
      <Text
        variant="body-smBold"
        color={textColor}
        aria-label={`Package name: ${title}`}
      >
        {title}
      </Text>
      <StyledTemperature
        aria-label={`Temperature: ${temperature} degrees celsius`}
        role="group"
      >
        <Icon name="smallTemp" size="sm" aria-hidden="true" />
        <Text variant="h1" color={textColor}>
          {temperature}°C
        </Text>
      </StyledTemperature>
      <StyledDeliverystatus
        role="status"
        aria-label={`Package status: ${statusText}`}
      >
        <Text variant="body-smBold" color={textColor}>
          {statusText}
        </Text>
      </StyledDeliverystatus>
      <Text
        variant="body-sm"
        color={textColor}
        aria-label={`Estimated arrival: ${ETA}`}
      >
        {ETA}
      </Text>

      <Text
        variant="body-sm"
        color={textColor}
        aria-label={`Package ID: ${id}`}
      >
        ID:&nbsp;
        <Ellipsis>{id}</Ellipsis>
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

/* New: inline element that truncates long text with an ellipsis */
const Ellipsis = styled.span`
  display: inline-block;
  max-width: 4rem; /* tweak this value to fit your layout (px, rem, % are fine) */
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
