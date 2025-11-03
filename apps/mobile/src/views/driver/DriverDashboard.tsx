import { useNavigate } from "react-router";
import styled from "styled-components";
import CardList from "../../components/Cards/CardList";
import DashboardHeader from "../../components/DashboardHeader";
import { Toggle, colors, Text } from "@chas/ui";
import { filterOptions } from "../../utils/dashboardUtils";
import { usePackagesContext } from "../../context/packages/usePackagesContext";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const {
    loading,
    isRefreshing,
    selectedFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    filteredPackages,
    filterCounts,
    getPackageById,
  } = usePackagesContext();

  const navigate = useNavigate();

  const toggleOptions = filterOptions.map((o) => ({
    value: o.value,
    label: o.value,
    icon: o.icon,
    count: filterCounts[o.value] ?? 0,
  }));

  return (
    <DashboardContainer
      className="page"
      role="main"
      aria-label="Driver dashboard for package management"
    >
      <DashboardHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Centered role="region" aria-label="Filter packages">
        <Toggle
          name="filters"
          options={toggleOptions}
          value={selectedFilter}
          onChange={(v) => setSelectedFilter(v as typeof selectedFilter)}
          iconSize="sm"
          aria-label={`Filter: ${selectedFilter}`}
        />
      </Centered>

      <CardListContainer role="region" aria-label="List of packages">
        {loading ? (
          <Centered role="status" aria-label="Loading packages">
            <ClipLoader size={64} color={colors.primary} />
          </Centered>
        ) : (
          <>
            <CardList
              cards={filteredPackages}
              variant="large"
              onCardClick={(packageId) => {
                navigate(`package/${packageId}`, {
                  state: {
                    packageData: getPackageById(packageId),
                  },
                });
              }}
              aria-label={`${filteredPackages.length} packages`}
            />
          </>
        )}
        {isRefreshing && (
          <RefreshIndicator>
            <Text variant="body-sm" color="secondary">
              Updating...
            </Text>
          </RefreshIndicator>
        )}
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

const RefreshIndicator = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.secondary};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;
