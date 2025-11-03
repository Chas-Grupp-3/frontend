import { useLocation, useRoutes, matchPath } from "react-router";
import DriverRoutes from "./routes/DriverRoutes";
import UserRoutes from "./routes/UserRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import GlobalStyles from "./styles/GlobalStyles";
import AuthProvider from "./context/auth/AuthProvider";
import Navigation from "./components/Navigation";
import { useIsMobile } from "./hooks/useIsMobile";
import { useAuthContext } from "./context/auth/useAuthContext";
import LocationProvider from "./context/location/LocationProvider";
import { PackagesProvider } from "./context/packages/PackagesProvider";

const AppContent = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { role } = useAuthContext();

  const base = role ? `/${role}` : "";

  const hideNavRoutes = ["/login", `${base}/scan/:mode`];

  // Use pattern-based check
  const shouldHideNav =
    hideNavRoutes.some((pattern) =>
      matchPath({ path: pattern, end: false }, location.pathname)
    ) || location.pathname.startsWith(`${base}/package/`);

  const allRoutes = [...PublicRoutes, ...DriverRoutes, ...UserRoutes];
  const element = useRoutes(allRoutes);

  if (!isMobile) {
    return (
      <div className="page-centered">
        <h2>This app is designed for mobile devices.</h2>
        <p>Please access it on a smartphone or tablet.</p>
      </div>
    );
  }

  return (
    <>
      <GlobalStyles />
      <main className="main-content">{element}</main>
      {!shouldHideNav && <Navigation />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <LocationProvider>
      <PackagesProvider>
        <AppContent />
      </PackagesProvider>
    </LocationProvider>
  </AuthProvider>
);

export default App;
