import { colors, Text, Icon, TextInput } from "@chas/ui";
import styled from "styled-components";

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <StyledBox>
      <Logo>
        <Icon name="whiteTemp" size="lg" alt="ThermoTrack Logo" />
        <LogoText>
          <StyledText variant="h3">ThermoTrack</StyledText>
          <StyledText variant="body-sm">
            Climate-Controlled Transport
          </StyledText>
        </LogoText>
      </Logo>

      <StyledText variant="nav">My shipments</StyledText>

      <SearchContainer>
        <TextInput
          placeholder="Search by ID / name / QR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon>
          <Icon name="qrScan" size="sm" />
        </SearchIcon>
      </SearchContainer>
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
  margin-bottom: 2rem;
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

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: ${colors.greyText};
`;
