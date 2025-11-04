import { Navigate } from "react-router";
import Login from "../views/Login";
import { useAuthContext } from "../context/auth/useAuthContext";
import type { RouteObject } from "react-router";

const RootRedirect = () => {
  const { isAuthenticated, role, loading } = useAuthContext();

  if (loading) return null;

  if (isAuthenticated && role) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <Navigate to="/login" replace />;
};

const PublicRoutes: RouteObject[] = [
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <RootRedirect /> }, // Catch-all for any non-existent routes
];

export default PublicRoutes;
