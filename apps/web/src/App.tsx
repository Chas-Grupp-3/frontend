import "./App.css";
import { Toggle } from "@chas/ui";
import { Modal } from "@chas/ui";
import { Button } from "@chas/ui";
import { useState } from "react";

function App() {
  const [selectedView, setSelectedView] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewOptions = [
    { value: "home", icon: "package" as const, label: "Home View", count: 5 },
    { value: "list", icon: "package" as const, label: "List View", count: 10 },
    { value: "grid", icon: "package" as const, label: "Grid View", count: 15 },
  ];

  return (
    <div
      style={{
        padding: "20px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Toggle
        name="view-toggle"
        options={viewOptions}
        value={selectedView}
        onChange={setSelectedView}
        iconSize="md"
      />

      <Button label="Open Modal" onClick={() => setIsModalOpen(true)} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <p>This is the modal content. You can put any React components here.</p>
        <div style={{ marginTop: "20px" }}>
          <Button label="Close Modal" onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
