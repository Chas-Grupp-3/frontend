import { Link, useLocation } from "react-router";
import styled from "styled-components";
import { colors, Text } from "@chas/ui";

const Navigation = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavLink to="/" $isActive={location.pathname === "/"}>
        <NavIcon>🏠</NavIcon>
        <Text
          variant="body"
          color={location.pathname === "/" ? "secondary" : "background"}
        >
          Dashboard
        </Text>
      </NavLink>

      <NavLink to="/scan" $isActive={location.pathname === "/scan"}>
        <NavIcon>📷</NavIcon>
        <Text
          variant="body"
          color={location.pathname === "/scan" ? "secondary" : "background"}
        >
          Scan
        </Text>
      </NavLink>

      <NavLink to="/warnings" $isActive={location.pathname === "/warnings"}>
        <NavIcon>⚠️</NavIcon>
        <Text
          variant="body"
          color={location.pathname === "/warnings" ? "secondary" : "background"}
        >
          Warnings
        </Text>
      </NavLink>

      <NavLink to="/login" $isActive={location.pathname === "/login"}>
        <NavIcon>👤</NavIcon>
        <Text
          variant="body"
          color={location.pathname === "/login" ? "secondary" : "background"}
        >
          Login
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
