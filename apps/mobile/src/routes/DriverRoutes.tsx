import type { RouteObject } from "react-router";
import DriverLayout from "../layouts/DriverLayout";
import Dashboard from "../views/driver/DriverDashboard";
import Scan from "../views/Scan";
import PackageDetails from "../views/driver/DriverPackageDetails";
import RequireAuth from "../components/RequireAuth";
import Profile from "../views/driver/DriverProfile";
import DriverMap from "../views/driver/DriverMap";

const DriverRoutes: RouteObject[] = [
  {
    path: "/driver",
    element: (
      <RequireAuth role="driver">
        <DriverLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "scan", element: <Scan /> },
      { path: "package/:id", element: <PackageDetails /> },
      { path: "map", element: <DriverMap /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default DriverRoutes;
