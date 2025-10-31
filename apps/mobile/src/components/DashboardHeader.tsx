import { colors, Text, Icon } from "@chas/ui";
import styled from "styled-components";
import DashboardSearchFilter from "./DashboardSerchFilter";

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <StyledBox
      role="banner"
      aria-labelledby="dashboard-title"
      aria-describedby="dashboard-description"
    >
      <ScreenReaderOnly id="dashboard-description">
        Dashboard header med logotyp, titel och sökfunktion för dina
        försändelser
      </ScreenReaderOnly>
      <Logo
        role="img"
        aria-label="ThermoTrack Logo - Climate-Controlled Transport"
      >
        <Icon name="whiteTemp" size="lg" alt="ThermoTrack Logo" />
        <LogoText>
          <StyledText variant="h3" aria-label="ThermoTrack company name">
            ThermoTrack
          </StyledText>
          <StyledText variant="body-sm" aria-label="Company Logo">
            Climate-Controlled Transport
          </StyledText>
        </LogoText>
      </Logo>

      <StyledText variant="nav">My shipments</StyledText>

      <DashboardSearchFilter
        aria-label="Search and filter shipments"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </StyledBox>
  );
};

export default DashboardHeader;

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: ${colors.primary};
  gap: 2rem;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.1rem;
  color: ${colors.whiteBackground};
  margin-top: 1rem;
`;
const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: flex-start;
  color: ${colors.primary};
`;

const StyledText = styled(Text)`
  color: ${colors.whiteBackground};
`;
const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
