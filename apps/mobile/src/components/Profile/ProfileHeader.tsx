import { colors, Text, Icon, Button } from "@chas/ui";
import styled from "styled-components";
import { useAuthContext } from "../../context/auth/useAuthContext";

const ProfileHeader = () => {
  const { logout } = useAuthContext();
  return (
    <StyledBox role="banner" aria-label="Profile Header">
      <Logo>
        <Icon
          name="whiteTemp"
          size="lg"
          alt="ThermoTrack Logo - temperature icon"
        />
        <LogoText>
          <StyledText variant="h3">ThermoTrack</StyledText>
          <StyledText variant="body-sm">
            Climate-Controlled Transport
          </StyledText>
        </LogoText>
      </Logo>
      <Button
        type="button"
        onClick={logout}
        buttonVariant="secondary"
        aria-label="Log out button"
      >
        Log out
      </Button>
    </StyledBox>
  );
};

export default ProfileHeader;

const StyledBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: ${colors.primary};
  gap: 2rem;
  padding-bottom: 2rem;
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
