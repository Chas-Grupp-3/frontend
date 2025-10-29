import { Routes, Route } from "react-router";
import WebShipment from "./views/WebShipment";
import GlobalStylesWeb from "./styles/GlobalStylesWeb";

const App = () => {
  return (
    <>
      <GlobalStylesWeb />
      <main className="main-content">
        <Routes>
          <Route path="/WebShipment" element={<WebShipment />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
