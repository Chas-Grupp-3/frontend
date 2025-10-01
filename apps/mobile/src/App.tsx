import { Routes, Route } from "react-router";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import PackageDetails from "./views/PackageDetails";
import Scan from "./views/Scan";
import Warnings from "./views/Warnings";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/warnings" element={<Warnings />} />
      </Routes>
      <Navigation />
    </>
  );
};

export default App;
