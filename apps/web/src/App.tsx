import "./App.css";
import { Toggle } from "@chas/ui";
import { useState } from "react";

function App() {
  const [selectedView, setSelectedView] = useState("home");

  const viewOptions = [
    { value: "home", icon: "package" as const, label: "Home View", count: 5 },
    { value: "list", icon: "package" as const, label: "List View", count: 10 },
    { value: "grid", icon: "package" as const, label: "Grid View", count: 15 },
  ];

  return (
    <div style={{ padding: "20px", justifyContent: "center", display: "flex" }}>
      <Toggle
        name="view-toggle"
        options={viewOptions}
        value={selectedView}
        onChange={setSelectedView}
        iconSize="md"
      />
    </div>
  );
}

export default App;
