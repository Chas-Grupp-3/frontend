import "./App.css";
import { Toggle } from "@chas/ui";
import { useState } from "react";

function App() {
  return (
    <Button
      buttonVariant="destructive"
      label="web"
      onClick={() => console.log("hej hej")}
    />
  );
}

export default App;
