import "./App.css";
import { Button } from "@chas/ui";

function App() {
  return (
    <Button
      buttonStyle="destructive"
      label="web"
      onClick={() => console.log("hej hej")}
    />
  );
}

export default App;
