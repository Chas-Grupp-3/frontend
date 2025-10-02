import "./App.css";
import { Button } from "@chas/ui";

function App() {
  return (
    <Button buttonVariant="destructive" onClick={() => console.log("hej hej")}>
      test
    </Button>
  );
}

export default App;
