import type { RouteObject } from "react-router";
import UserLayout from "../layouts/UserLayput";
import Dashboard from "../views/user/UserDashboard";
import Scan from "../views/Scan";
import UserPackageDetails from "../views/user/UserPackageDetails";
import Warnings from "../views/user/UserWarnings";
import RequireAuth from "../components/RequireAuth";
import Profile from "../views/user/UserProfile";

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
      { path: "package/:id", element: <UserPackageDetails /> },
      { path: "warnings", element: <Warnings /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default UserRoutes;
