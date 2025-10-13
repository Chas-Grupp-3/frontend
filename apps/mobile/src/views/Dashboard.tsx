import { colors, radius, Text, Button } from "@chas/ui";
import { useNavigate } from "react-router";
import Card from "../components/Cards/Card";
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
    packageId: "Y67X093A4",
    threshold: 14,
  },
  {
    id: 2,
    title: "Frost and Found",
    temperature: 18,
    deliveryStatus: "delivered",
    ETA: "19 Dec kl. 11.10",
    packageId: "Y67X093A5",
    threshold: 14,
  },
  {
    id: 3,
    title: "License to Chill",
    temperature: 8,
    deliveryStatus: "late",
    ETA: "19 Dec kl. 11.30",
    packageId: "Y67X093A6",
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
                onClick={() => navigate(`/package/${item.packageId}`)}
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
  box-shadow: inset 0 4px 10px ${colors.greyText};
  overflow: auto;
  margin-top: 4rem;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 0.3rem;
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  li {
    flex: 0 0 calc(50% - 0.5rem);
  }
`;
