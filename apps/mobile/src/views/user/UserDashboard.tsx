import styled from "styled-components";
import { filterOptions } from "../../utils/dashboardUtils";
import { usePackagesContext } from "../../context/packages/usePackagesContext";
import DashboardContent from "../../components/Dashboard/DashboardContent";

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
      <DashboardContent
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filteredPackages={filteredPackages}
        loading={loading}
        isRefreshing={isRefreshing}
        getPackageById={getPackageById}
        toggleOptions={toggleOptions}
      />
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
