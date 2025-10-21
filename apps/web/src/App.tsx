import { Routes, Route } from "react-router";
import WebShipment from "./views/WebShipment";

const App = () => {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/WebShipment" element={<WebShipment />} />
      </Routes>
    </main>
  );
};

export default App;
