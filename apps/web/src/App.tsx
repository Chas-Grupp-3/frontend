import "./App.css";
import { Card } from "@chas/ui";

function App() {
  return (
    <div>
      <Card
        title="Random CompanyName AB"
        temperature={3}
        DeliveryStatus="on time"
        ETA="19 Dec kl. 10.15"
        id="Y67X093A3"
        threshold={14}
        variant="large"
      />
    </div>
  );
}

export default App;
