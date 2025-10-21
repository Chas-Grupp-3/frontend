import UserLayout from "../layouts/UserLayput";
import Dashboard from "../views/Dashboard";
import Scan from "../views/Scan";
import PackageDetails from "../views/PackageDetails";
import Warnings from "../views/Warnings";
import type { RouteObject } from "react-router";
import RequireAuth from "../components/RequireAuth";
import Profile from "../views/Profile";

const UserRoutes: RouteObject[] = [
  {
    path: "/user",
    element: (
      <RequireAuth role="user">
        <UserLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "scan", element: <Scan /> },
      { path: "package/:id", element: <PackageDetails /> },
      { path: "warnings", element: <Warnings /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default UserRoutes;
