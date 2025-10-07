import "./App.css";
import { Card } from "@chas/ui";

function App() {
  return (
    <div>
      <Card
        title="Random CompanyName AB"
        temperature={68}
        deliveryStatus="delivered"
        ETA="19 Dec kl. 10.15"
        id="Y67X093A3"
        threshold={14}
        variant="small"
      />
    </div>
  );
}

export default App;
