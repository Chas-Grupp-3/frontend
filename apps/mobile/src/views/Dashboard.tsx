import { Button, colors } from "@chas/ui";
import { useNavigate } from "react-router";
import { useState } from "react";
import CardList, { type CardInfo } from "../components/Cards/CardList";
import DashboardHeader from "../components/DashboardHeader";
import { Icon } from "@chas/ui";
import styled from "styled-components";

const initialCards: CardInfo[] = [
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
  const [cards, setCards] = useState<CardInfo[]>(initialCards);

  const sortByTitle = () =>
    setCards([...cards].sort((a, b) => a.title.localeCompare(b.title)));

  return (
    <div className="page">
      <DashboardHeader />
      <div>
        <FilterContainer>
          <FilterIcon>
            <Button onClick={sortByTitle}>
              <Icon name="whiteHamburger" size="sm" />
              Filter
            </Button>
          </FilterIcon>
        </FilterContainer>
      </div>

      <CardList
        cards={cards}
        onCardClick={(packageId) => navigate(`/package/${packageId}`)}
        variant="small"
      />
    </div>
  );
};

export default Dashboard;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.greyText};
`;
