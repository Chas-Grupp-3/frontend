import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthContext } from "../context/auth/useAuthContext";
import styled from "styled-components";
import type { JSX } from "react";

type RequireAuthProps = {
  children: JSX.Element;
  role?: "driver" | "user";
};

const RequireAuth = ({ children, role }: RequireAuthProps) => {
  const { isAuthenticated, loading, role: userRole } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true, state: { from: location } });
      }
      return;
    }

    if (role && userRole && userRole !== role) {
      navigate(`/${userRole}`, { replace: true });
    }
  }, [loading, isAuthenticated, userRole, role, navigate, location]);

  if (loading) {
    return (
      <LoaderContainer
        role="status"
        aria-label="Authentication loading"
        aria-live="polite"
      >
        Loading…
      </LoaderContainer>
    );
  }

  if (!isAuthenticated) return null;
  if (role && userRole && userRole !== role) return null;

  return children;
};

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

export default RequireAuth;
