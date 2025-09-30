import "./App.css";
import { Button } from "@chas/ui";
import TextInput from "@chas/ui/TextInput";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Button label="web" />

      <TextInput placeholder="Email" hint="Ange din jobbmail" inputSize="sm" />
      <TextInput placeholder="Email" hint="Ange din jobbmail" inputSize="md" />
      <TextInput placeholder="Email" hint="Ange din jobbmail" inputSize="lg" />
    </div>
  );
}

export default App;
