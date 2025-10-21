import Login from "../views/Login";
import type { RouteObject } from "react-router";

const PublicRoutes: RouteObject[] = [{ path: "/login", element: <Login /> }];

export default PublicRoutes;
