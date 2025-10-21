import styled from "styled-components";
import { Text, Icon } from "@chas/ui";
const Logo = () => {
  return (
    <StyledLogo>
      <Icon name="smallTempHot" size={64} alt="ThermoTrack Logo" />
      <LogoText>
        <Text variant="h2" color="primary">
          ThermoTrack
        </Text>
        <Text variant="body-sm">Climate-Controlled Transport</Text>
      </LogoText>
    </StyledLogo>
  );
};

export default Logo;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-shrink: 0;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & h2 {
    line-height: 1.2;
  }
`;
