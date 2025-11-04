import { Text, Icon } from "@chas/ui";
import styled from "styled-components";

const LogoWeb = () => {
  return (
    <Logo>
      <Icon name="smallTempHot" size={64} alt="ThermoTrack Logo" />
      <LogoText>
        <Text variant="h2">ThermoTrack</Text>
        <Text variant="body-sm">Climate-Controlled Transport</Text>
      </LogoText>
    </Logo>
  );
};

export default LogoWeb;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const LogoText = styled.div`
  margin-left: 8px;
`;
