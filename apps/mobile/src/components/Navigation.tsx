import { Link, useLocation } from "react-router";
import styled from "styled-components";
import { colors, Icon } from "@chas/ui";
import { useAuthContext } from "../context/auth/useAuthContext";

const Navigation = () => {
  const location = useLocation();
  const { role } = useAuthContext();
  const base = role ? `/${role}` : "";

  return (
    <NavContainer>
      <NavLink to={`${base}`} $isActive={location.pathname === "/"}>
        <Icon name="home" size="sm" alt="Dashboard Icon" />
      </NavLink>

      <NavLink to={`${base}/scan`} $isActive={location.pathname === "/scan"}>
        <Icon name="whiteQr" size="sm" alt="Scan Icon" />
      </NavLink>
      {role === "driver" && (
        <NavLink to={`${base}/map`} $isActive={location.pathname === "/map"}>
          <Icon name="map" size="sm" alt="Map Icon" />
        </NavLink>
      )}
      <NavLink
        to={`${base}/profile`}
        $isActive={location.pathname === "/profile"}
      >
        <Icon name="whiteUser" size="sm" alt="User Icon" />
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

export default Navigation;
