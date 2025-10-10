import { Text, Button } from "@chas/ui";
import { colors, radius } from "@chas/ui";
import { useNavigate } from "react-router";
import { Card } from "@chas/ui";
import { useState } from "react";
import styled from "styled-components";


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
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardInfo[]>(cardInfo);

  const handleViewPackage = () => {
    console.log("Clicked!");
  };

  const sortByTitle = () => {
    const sorted = [...cards].sort((a, b) => a.title.localeCompare(b.title));
    setCards(sorted);
  };

  const sortByTemperature = () => {
    const sorted = [...cards].sort((a, b) => b.temperature - a.temperature);
    setCards(sorted);
  };

  return (
    <div>
      <Text variant="h1">Dashboard</Text>
      <div>
        <Button onClick={handleViewPackage}>View Package Details</Button>
        <Button onClick={sortByTitle}>Sort by Title</Button>
        <Button onClick={sortByTemperature}>Sort by Temperature</Button>
      </div>
      <StyledBox>
        <ul>
          {cards.map((item) => (
            <li key={item.id}>
              <Card
                key={item.id}
                variant="small"
                title={item.title}
                temperature={item.temperature}
                deliveryStatus={item.deliveryStatus}
                ETA={item.ETA}
                id={item.packageId}
                threshold={item.threshold}
              />
            </li>
          ))}
        </ul>
      </StyledBox>
    </div>
  );
};

export default Dashboard;

const StyledBox = styled.section`
  width: 360px;
  height: 360px;
  padding: 1rem;
  border-radius: ${radius.box};
  background-color: ${colors.primary}
`;
