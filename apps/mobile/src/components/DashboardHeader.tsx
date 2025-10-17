import { colors, Text, Icon, TextInput } from "@chas/ui";
import styled from "styled-components";

const DashboardHeader = () => {
  return (
    <StyledBox>
      <StyledName>
        <Icon name="bigTemp" size="md" />
        <div>
          <StyledText variant="h3">ThermoTrack</StyledText>
          <StyledText variant="body-sm">
            Climate-Controlled Transport
          </StyledText>
        </div>
      </StyledName>

      <StyledText variant="h3">My shipments</StyledText>

      <SearchContainer>
        <TextInput placeholder="Search by ID / name / QR" />
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
  width: 100vw;
  min-height: 15rem;
  padding: 1rem;
  background-color: ${colors.primary};
  margin-bottom: 4rem;
  margin-top: -100vh;
  padding-top: 100vh;
  gap: 2rem;
`;

const StyledName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${colors.whiteBackground};
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
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: ${colors.greyText};
`;
