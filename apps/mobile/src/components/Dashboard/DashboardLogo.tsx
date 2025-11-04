import { styled } from "styled-components";
import { Icon, Text } from "@chas/ui";
import { colors } from "@chas/ui";

const DashboardLogo = () => {
  return (
    <Logo role="banner" aria-label="ThermoTrack application logo">
      <Icon
        name="whiteTemp"
        size="lg"
        alt="ThermoTrack Logo"
        aria-label="Temperature monitoring logo icon"
      />
      <LogoText role="group" aria-label="Company name and tagline">
        <Text
          color="whiteBackground"
          variant="h3"
          aria-label="Company name: ThermoTrack"
        >
          ThermoTrack
        </Text>
        <Text
          color="whiteBackground"
          variant="body-sm"
          aria-label="Company tagline: Climate-Controlled Transport"
        >
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
