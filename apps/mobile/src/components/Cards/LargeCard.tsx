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
interface PillProps {
  $backgroundColor: string;
}

const LargeCard = ({
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
    <StyledCard onClick={onClick} {...rest}>
      <FlexRow>
        <Text variant="body-smBold">{title}</Text>
        <Pill $backgroundColor={backgroundColor}>
          <Text variant="body-smBold" color={textColor}>
            {statusText}
          </Text>
        </Pill>
      </FlexRow>
      <FlexRow>
        <Temperature>
          <Icon name="smallTemp" size="md" />
          <Text variant="h2">{temperature}°</Text>
        </Temperature>
        <PackageInfo>
          <Text variant="body-sm">ETA: {ETA}</Text>
          <Text variant="body-sm">ID: {id}</Text>
        </PackageInfo>
      </FlexRow>
    </StyledCard>
  );
};

export default LargeCard;

const StyledCard = styled.article`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  border-radius: ${radius.box};
  background-color: ${colors.pause};
  padding: 0.6rem;
  min-width: 250px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Pill = styled.div<PillProps>`
  background-color: ${(props) => props.$backgroundColor};
  border-radius: ${radius.box};
  display: flex;
  padding: 0.2rem 0.9rem;
`;

const Temperature = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PackageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  padding-right: 0.5em;
`;
