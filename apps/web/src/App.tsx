import "./App.css";
import { Button } from "@chas/ui";

function App() {
  return (
    <Button
      buttonVariant="disabled"
      label="web"
      onClick={() => console.log("hej hej")}
    />
  );
}

export default App;
