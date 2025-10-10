import { Text, Button } from "@chas/ui";
import { useNavigate } from "react-router";
import { Card } from "@chas/ui";

type CardInfo = {
  id: number;
  title: string;
  temperature: number;
  deliveryStatus: "delivered" | "on time" | "late";
  ETA: string;
  packageId: string;
  threshold: number;
};

const cardInfo: CardInfo[] = [
  {
    id: 0,
    title: "Game of Cones",
    temperature: 8,
    deliveryStatus: "delivered",
    ETA: "19 Dec kl. 10.15",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 1,
    title: "The Codfather",
    temperature: 8,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 10.45",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 2,
    title: "Frost and Found",
    temperature: 18,
    deliveryStatus: "delivered",
    ETA: "19 Dec kl. 11.10",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 3,
    title: "License to Chill",
    temperature: 8,
    deliveryStatus: "late",
    ETA: "19 Dec kl. 11.30",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 4,
    title: "S´no Problem",
    temperature: 18,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 11.50",
    packageId: "Y67X093A3",
    threshold: 14,
  },
  {
    id: 5,
    title: "The Big Chillski",
    temperature: 8,
    deliveryStatus: "on time",
    ETA: "19 Dec kl. 12.10",
    packageId: "Y67X093A3",
    threshold: 14,
  },
];
const Dashboard = () => {
  const handleViewPackage = () => {
    console.log("Clicked!");
  };

  const listItems = cardInfo.map((item) => <li key={item.id}>{item.title}</li>);

  return (
    <div>
      <Text variant="h1">Dashboard</Text>
      <Button onClick={handleViewPackage}>View Package Details</Button>
      <ul>{listItems}</ul>
    </div>
  );
};

export default Dashboard;
