import { colors, radius } from "./styles";
import Text from "./Text/Text";
import styled from "styled-components";
import { Icon } from "./Icon";

type CardProps = {
  title: string;
  temperature: number;
  ETA?: string;
  id: string;
  backgroundColor: string;
  textColor: keyof typeof colors;
  statusText: string;
};

const LargeCard = ({
  title,
  temperature,
  ETA,
  id,
  backgroundColor,
  textColor,
  statusText,
}: CardProps) => {
  return (
    <StyledCard
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <StyledInfo>
        <Text variant="body-smBold" color={textColor}>
          {title}
        </Text>
        <StyledDeliveryStatus>
          <Text variant="body-smBold" color={textColor}>
            {statusText}
          </Text>
        </StyledDeliveryStatus>
      </StyledInfo>
      <StyledContent>
        <StyledLeftColumn>
          <Icon name="smallTemp" size="sm" />
          <Text variant="h1" color={textColor}>
            {temperature}°
          </Text>
        </StyledLeftColumn>
        <StyledRightColumn>
          <Text variant="body-sm" color={textColor}>
            ETA: {ETA}
          </Text>
          <Text variant="body-sm" color={textColor}>
            ID: {id}
          </Text>
        </StyledRightColumn>
      </StyledContent>
    </StyledCard>
  );
};

export default LargeCard;

const StyledCard = styled.article`
  width: 348px;
  height: 78px;
  padding: 1rem;
  border-radius: ${radius.box};
`;
const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const StyledDeliveryStatus = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  padding: 2px 6px;
  white-space: nowrap;
`;
const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3;
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  align-items: center;
`;
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3;
`;
