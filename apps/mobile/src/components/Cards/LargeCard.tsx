import styled from "styled-components";
import { Icon, Text, colors, radius } from "@chas/ui";

interface CardProps {
  title: string;
  temperature: number;
  humidity?: number;
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
  humidity,
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
      onClick={onClick}
      {...rest}
      role="article"
      aria-label={`Paket ${title}, temperatur ${temperature} grader${humidity ? `, luftfuktighet ${humidity} procent` : ""}, status ${statusText}`}
      tabIndex={0}
      aria-describedby={`card-content-${id}`}
    >
      <FlexRow role="group" aria-label="Paketrubrik och status">
        <Text variant="h1" aria-label={`Paketnamn: ${title}`}>
          {title}
        </Text>
        <Pill
          $backgroundColor={backgroundColor}
          role="status"
          aria-label={`Paketstatus: ${statusText}`}
        >
          <Text variant="body-smBold" color={textColor}>
            {statusText}
          </Text>
        </Pill>
      </FlexRow>
      <FlexRow
        role="group"
        aria-label="Paketinformation"
        id={`card-content-${id}`}
      >
        <Temperature
          role="group"
          aria-label={`Temperatur: ${temperature} grader`}
        >
          <Icon name="smallTemp" size="sm" aria-hidden="true" />
          <Text variant="body-lg">{temperature}°</Text>
        </Temperature>
        <Temperature
          role="group"
          aria-label={`Luftfuktighet: ${humidity} procent`}
        >
          <Icon name="humidity" size="sm" aria-hidden="true" />
          <Text variant="body-lg">{humidity}%</Text>
        </Temperature>
        <PackageInfo role="group" aria-label="Leveransinformation">
          <Text variant="body-sm" aria-label={`Beräknad ankomst: ${ETA}`}>
            ETA: {ETA}
          </Text>
          <Text variant="body-sm" aria-label={`Paket-ID: ${id}`}>
            ID: <Ellipsis>{id}</Ellipsis>
          </Text>
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

const Ellipsis = styled.span`
  display: inline-block;
  max-width: 8.3rem; /* tweak this value to fit your layout (px, rem, % are fine) */
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
