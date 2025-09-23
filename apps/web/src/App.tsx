import "./App.css";
import { Button } from "@chas/ui";
import { Card } from "@chas/ui";

function App() {
  return (
    <div>
      <Button label="web" />
      <Card title="Äppelmos">
        <button>Jag är en knapp</button>
        <h1>Jag är stor</h1>
      </Card>
    </div>
  );
}

export default App;
