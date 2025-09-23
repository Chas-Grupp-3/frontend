import "./App.css";
import { Button } from "@chas/ui";
import TextInput from "@chas/ui/TextInput";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <Button label="web" />

      <TextInput
        label="Email"
        placeholder="you@domain.com"
        hint="Ange din jobbmail"
        inputSize="md"
      />

      <TextInput
        label="Lösenord"
        type="password"
        error="Lösenordet måste vara minst 8 tecken"
        inputSize="md"
      />
    </div>
  );
}

export default App;
