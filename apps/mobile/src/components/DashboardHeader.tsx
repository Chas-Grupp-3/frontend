import { colors, Text } from "@chas/ui";
import styled from "styled-components";
import { Icon } from "@chas/ui";
import { TextInput } from "@chas/ui";

const DashboardHeader = () => {
  return (
    <StyledBox>
      <StyledLogo>
        <StyledName>
          <StyledIcon>
            <Icon name="bigTemp" size="md" />
          </StyledIcon>
          <StyledTextContainer>
            <StyledText variant="h3">ThermoTrack</StyledText>
            <StyledText variant="body-sm">
              Climate-Controlled Transport
            </StyledText>
          </StyledTextContainer>
        </StyledName>
      </StyledLogo>
      <StyledInfo>
        <StyledText variant="h3">My shipments</StyledText>
      </StyledInfo>
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
  flex-wrap: wrap;
  width: 100%;
  height: 15rem;
  padding: 1rem;
  background-color: ${colors.primary};
  margin-bottom: 4rem;
`;
const StyledLogo = styled.div`
  color: ${colors.whiteBackground};
`;
const StyledIcon = styled.div`
  color: ${colors.whiteBackground};
`;
const StyledName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const StyledTextContainer = styled.div`
  margin-bottom: 2rem;
`;
const StyledInfo = styled.div`
  margin-bottom: 2rem;
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
