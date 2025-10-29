import type { RouteObject } from "react-router";
import UserLayout from "../layouts/UserLayput";
import Dashboard from "../views/user/UserDashboard";
import ScanWrapper from "../views/ScanWrapper";
import UserPackageDetails from "../views/user/UserPackageDetails";
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
      { path: "scan/:mode", element: <ScanWrapper /> },
      { path: "package/:id", element: <UserPackageDetails /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default UserRoutes;
