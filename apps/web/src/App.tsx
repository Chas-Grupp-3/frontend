import { useState } from "react";
import { Modal, Text, Button } from "@chas/ui";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Text variant="h2">Modal </Text>
        <Text>Modal content goes here</Text>
      </Modal>
    </>
  );
}

export default App;
