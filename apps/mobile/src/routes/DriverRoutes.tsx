import type { RouteObject } from "react-router";
import DriverLayout from "../layouts/DriverLayout";
import Dashboard from "../views/driver/DriverDashboard";
import ScanWrapper from "../views/ScanWrapper";
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
      { path: "scan/:mode", element: <ScanWrapper /> },
      { path: "package/:id", element: <PackageDetails /> },
      { path: "map", element: <DriverMap /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];

export default DriverRoutes;
