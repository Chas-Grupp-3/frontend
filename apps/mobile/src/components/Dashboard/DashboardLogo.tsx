import { styled } from "styled-components";
import { Icon, Text } from "@chas/ui";
import { colors } from "@chas/ui";

const DashboardLogo = () => {
  return (
    <Logo>
      <Icon name="whiteTemp" size="lg" alt="ThermoTrack Logo" />
      <LogoText>
        <Text color="whiteBackground" variant="h3">
          ThermoTrack
        </Text>
        <Text color="whiteBackground" variant="body-sm">
          Climate-Controlled Transport
        </Text>
      </LogoText>
    </Logo>
  );
};
export default DashboardLogo;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
