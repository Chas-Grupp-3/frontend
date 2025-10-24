import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import styled from "styled-components";
import CardList from "../../components/Cards/CardList";
import type { CardInfo } from "../../types/packageTypes";
import DashboardHeader from "../../components/DashboardHeader";
import { Button, Toggle, colors } from "@chas/ui";
import {
  filterOptions,
  getFilterCounts,
  getFilteredCards,
  type FilterOption,
} from "../../utils/dashboardUtils";
import { usePackages } from "../../hooks/usePackages";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const {
    data: packagesData,
    loading,
    refresh,
  } = usePackages({ pollIntervalMs: null, defaultThreshold: 10 });
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const packages: CardInfo[] = useMemo(
    () => packagesData ?? [],
    [packagesData]
  );

  const filteredPackages = useMemo(
    () => getFilteredCards(packages, selectedFilter, searchTerm),
    [packages, selectedFilter, searchTerm]
  );

  const counts = useMemo(() => getFilterCounts(packages), [packages]);

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
        {loading ? (
          <Centered>
            <ClipLoader size={64} color={colors.primary} />
          </Centered>
        ) : (
          <CardList
            cards={filteredPackages}
            onCardClick={(packageId) => navigate(`package/${packageId}`)}
            variant="large"
          />
        )}
      </CardListContainer>
      <Centered>
        <Button onClick={refresh} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </Button>
      </Centered>
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
