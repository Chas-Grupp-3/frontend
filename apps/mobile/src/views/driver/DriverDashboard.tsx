import { useNavigate } from "react-router";
import { useState, useMemo } from "react";
import styled from "styled-components";
import CardList from "../../components/Cards/CardList";
import type { BackendPackage, CardInfo } from "../../types/packageTypes";
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
    mappedData: mappedPackagesData,
    loading,
    refresh,
  } = usePackages({ pollIntervalMs: null, defaultThreshold: 10 });
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const mappedPackages: CardInfo[] = useMemo(
    () => mappedPackagesData ?? [],
    [mappedPackagesData]
  );
  const packages: BackendPackage[] = useMemo(
    () => packagesData ?? [],
    [packagesData]
  );

  const filteredPackages = useMemo(
    () => getFilteredCards(mappedPackages, selectedFilter, searchTerm),
    [mappedPackages, selectedFilter, searchTerm]
  );

  const counts = useMemo(
    () => getFilterCounts(mappedPackages),
    [mappedPackages]
  );

  const toggleOptions = filterOptions.map((o) => ({
    value: o.value,
    label: o.value,
    icon: o.icon,
    count: counts[o.value] ?? 0,
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
          onChange={(v) => setSelectedFilter(v as FilterOption["value"])}
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
          <CardList
            cards={filteredPackages}
            variant="large"
            onCardClick={(packageId) => {
              navigate(`package/${packageId}`, {
                state: {
                  packageData: packages.find(
                    (pkg) => String(pkg.package_id) === String(packageId)
                  ),
                },
              });
            }}
            aria-label={`${filteredPackages.length} packages`}
          />
        )}
      </CardListContainer>

      <Centered role="region" aria-label="Dashboard actions">
        <Button
          onClick={refresh}
          disabled={loading}
          aria-label={loading ? "Updating..." : "Update packages"}
        >
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
