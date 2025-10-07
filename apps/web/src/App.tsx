import { TextInput } from "@chas/ui";
import "./App.css";

function App() {
  return (
    <div style={{ backgroundColor: "lightgray", padding: "20px" }}>
      <TextInput
        placeholder="Enter text"
        inputSize="md"
        variant="default"
        label="Text Input"
        hint="This is a hint"
      />
    </div>
  );
}

export default App;
