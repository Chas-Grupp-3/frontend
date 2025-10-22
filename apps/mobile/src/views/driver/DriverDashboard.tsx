import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import styled from "styled-components";
import CardList from "../../components/Cards/CardList";
import type { CardInfo } from "../../types/cardTypes";
import DashboardHeader from "../../components/DashboardHeader";
import { Toggle } from "@chas/ui";
import {
  filterOptions,
  getFilterCounts,
  getFilteredCards,
  mockCards,
  type FilterOption,
} from "../../utils/dashboardUtils";

const Dashboard = () => {
  const [cards] = useState<CardInfo[]>(mockCards);
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCards = useMemo(
    () => getFilteredCards(cards, selectedFilter, searchTerm),
    [cards, selectedFilter, searchTerm]
  );

  const counts = useMemo(() => getFilterCounts(cards), [cards]);

  const toggleOptions = filterOptions.map((o) => ({
    value: o.value,
    label: o.value,
    icon: o.icon,
    count: counts[o.value] ?? 0,
  }));

  return (
    <DashboardContainer className="page">
      <DashboardHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Centered>
        <Toggle
          name="filters"
          options={toggleOptions}
          value={selectedFilter}
          onChange={(v) => setSelectedFilter(v as FilterOption["value"])}
          iconSize="sm"
        />
      </Centered>
      <CardListContainer>
        <CardList
          cards={filteredCards}
          onCardClick={(packageId) => navigate(`/package/${packageId}`)}
          variant="large"
        />
      </CardListContainer>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100vh - 80px);
`;
const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 0 1rem;
  padding-bottom: 1rem;
`;
