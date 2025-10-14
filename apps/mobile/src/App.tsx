import { Routes, Route, useLocation } from "react-router";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import PackageDetails from "./views/PackageDetails";
import Scan from "./views/Scan";
import Warnings from "./views/Warnings";
import Navigation from "./components/Navigation";
import GlobalStyles from "./styles/GlobalStyles";
import { useIsMobile } from "./hooks/useIsMobile";

const App = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Define routes where navigation should be hidden
  const hideNavRoutes = ["/login", "/scan"];
  const shouldHideNav =
    hideNavRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/package/");

  if (!isMobile) {
    return (
      <>
        <GlobalStyles />
        <div className="page-centered">
          <h2>This app is designed for mobile devices.</h2>
          <p>Please access it on a smartphone or tablet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/warnings" element={<Warnings />} />
        </Routes>
      </main>
      {!shouldHideNav && <Navigation />}
    </>
  );
};

export default App;
