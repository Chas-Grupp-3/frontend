import "./App.css";
import { Button } from "@chas/ui";
import { Card } from "@chas/ui";
import { useState } from "react";
import { SmallCard } from "@chas/ui";
import { LargeCard } from "@chas/ui";

function App() {
  const [showLarge, setShowLarge] = useState(true);
  return (
    <div>
      <Button label="web" />
      <Card onClick={() => setShowLarge(!showLarge)}>
        {showLarge ? (
          <LargeCard title="YOLO" temperature={4} id="Y67X093A3" />
        ) : (
          <SmallCard title="YOLO" temperature={4} id="Y67X093A3" />
        )}
        <button>Jag är en knapp</button>
        <h1>Jag är stor</h1>
      </Card>
    </div>
  );
}

export default App;
