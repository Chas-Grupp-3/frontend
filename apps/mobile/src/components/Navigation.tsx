import { Link, useLocation } from "react-router";
import styled from "styled-components";
import { colors, Text } from "@chas/ui";
import { useAuthContext } from "../context/auth/useAuthContext";

const Navigation = () => {
  const location = useLocation();
  const { role } = useAuthContext();
  const base = role ? `/${role}` : "";

  return (
    <NavContainer>
      <NavLink to={`${base}`} $isActive={location.pathname === "/"}>
        <NavIcon>🏠</NavIcon>
        <Text
          variant="body"
          color={location.pathname === "/" ? "secondary" : "background"}
        >
          Dashboard
        </Text>
      </NavLink>

      <NavLink to={`${base}/scan`} $isActive={location.pathname === "/scan"}>
        <NavIcon>📷</NavIcon>
        <Text
          variant="body"
          color={
            location.pathname === `${base}/scan` ? "secondary" : "background"
          }
        >
          Scan
        </Text>
      </NavLink>
      {role === "driver" && (
        <NavLink to={`${base}/map`} $isActive={location.pathname === "/map"}>
          <NavIcon>🗺️</NavIcon>
          <Text
            variant="body"
            color={
              location.pathname === `${base}/map` ? "secondary" : "background"
            }
          >
            Map
          </Text>
        </NavLink>
      )}
      <NavLink
        to={`${base}/profile`}
        $isActive={location.pathname === "/profile"}
      >
        <NavIcon>👤</NavIcon>
        <Text
          variant="body"
          color={
            location.pathname === `${base}/profile` ? "secondary" : "background"
          }
        >
          Profile
        </Text>
      </NavLink>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.primary};
  flex-shrink: 0;
  height: 80px;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.$isActive ? colors.secondary : colors.background)};
  font-size: 0.8rem;
  padding: 0.5rem;
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

export default Navigation;
