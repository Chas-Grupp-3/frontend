import { useNavigate } from "react-router";
import { useState } from "react";
import styled from "styled-components";
import CardList, { type CardInfo } from "../components/Cards/CardList";
import DashboardHeader from "../components/DashboardHeader";
import { Icon, colors } from "@chas/ui";

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

type FilterOption = {
  value: "all" | "late" | "Temp issues";
  icon: "package" | "clock" | "tempWarning";
};

const filterOptions: FilterOption[] = [
  { value: "all", icon: "package" },
  { value: "late", icon: "clock" },
  { value: "Temp issues", icon: "tempWarning" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cards] = useState<CardInfo[]>(initialCards);
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");

  const getCountFor = (filter: FilterOption["value"]): number => {
    if (filter === "all") return cards.length;
    if (filter === "Temp issues")
      return cards.filter((card) => card.temperature > card.threshold).length;
    return cards.filter((card) => card.deliveryStatus === filter).length;
  };

  const getFilteredCards = (): CardInfo[] => {
    if (selectedFilter === "all") return cards;
    if (selectedFilter === "Temp issues")
      return cards.filter((card) => card.temperature > card.threshold);
    return cards.filter((card) => card.deliveryStatus === selectedFilter);
  };

  return (
    <div className="page">
      <DashboardHeader />
      <FilterContainer>
        {filterOptions.map((option) => (
          <FilterButton
            key={option.value}
            active={selectedFilter === option.value}
            onClick={() => setSelectedFilter(option.value)}
          >
            <Icon name={option.icon} size="sm" />
            <Count>{getCountFor(option.value)}</Count>
          </FilterButton>
        ))}
      </FilterContainer>

      <CardList
        cards={getFilteredCards()}
        onCardClick={(packageId) => navigate(`/package/${packageId}`)}
        variant="small"
      />
    </div>
  );
};

export default Dashboard;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const FilterButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  background-color: "#FFFFF0 ";
`;

const Count = styled.span`
  font-size: 0.9rem;
  color: ${colors.blueText};
`;
