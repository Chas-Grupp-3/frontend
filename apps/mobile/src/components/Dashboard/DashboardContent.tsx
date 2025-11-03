import { styled } from "styled-components";
import CardList from "../Cards/CardList";
import DashboardHeader from "./DashboardHeader";
import { Toggle, colors, Text, type IconName } from "@chas/ui";
import { ClipLoader } from "react-spinners";
import type { BackendPackage, CardInfo } from "../../types/packageTypes";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/auth/useAuthContext";

interface DashboardContentProps {
  loading: boolean;
  isRefreshing: boolean;
  selectedFilter: "all" | "late" | "Temp issues";
  setSelectedFilter: (filter: "all" | "late" | "Temp issues") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredPackages: CardInfo[];
  getPackageById: (packageId: string) => BackendPackage | undefined;
  toggleOptions: {
    value: string;
    label: string;
    icon: IconName;
    count: number;
  }[];
}

const DashboardContent = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  filteredPackages,
  loading,
  isRefreshing,
  getPackageById,
  toggleOptions,
}: DashboardContentProps) => {
  const navigate = useNavigate();
  const { role } = useAuthContext();

  return (
    <main role="main" aria-label="Dashboard content">
      <DashboardHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        aria-label="Search and navigation header"
      />

      <Centered
        role="region"
        aria-label="Filter packages"
        aria-describedby="filter-description"
      >
        <Toggle
          name="filters"
          options={toggleOptions}
          value={selectedFilter}
          onChange={(v) => setSelectedFilter(v as typeof selectedFilter)}
          iconSize="sm"
          aria-label={`Current filter: ${selectedFilter}`}
          aria-describedby="filter-description"
        />
        <span
          id="filter-description"
          style={{ position: "absolute", left: "-9999px" }}
        >
          Filter packages by status. Use arrow keys to navigate options.
        </span>
      </Centered>
      <CardListContainer
        role="region"
        aria-label="List of packages"
        aria-live="polite"
        aria-busy={loading}
        aria-describedby="package-count"
      >
        {loading ? (
          <Centered
            role="status"
            aria-label="Loading packages"
            aria-live="assertive"
          >
            <ClipLoader
              size={64}
              color={colors.primary}
              aria-label="Loading spinner"
            />
          </Centered>
        ) : (
          <>
            <div
              id="package-count"
              aria-live="polite"
              style={{ position: "absolute", left: "-9999px" }}
            >
              {filteredPackages.length} packages found
            </div>
            <CardList
              cards={filteredPackages}
              variant={
                role === "driver"
                  ? "large"
                  : role === "user"
                    ? "small"
                    : "small"
              }
              onCardClick={(packageId) => {
                navigate(`package/${packageId}`, {
                  state: {
                    packageData: getPackageById(packageId),
                  },
                });
              }}
              aria-label={`${filteredPackages.length} packages displayed`}
            />
          </>
        )}
        {isRefreshing ? (
          <RefreshIndicator
            role="status"
            aria-label="Updating package data"
            aria-live="polite"
          >
            <Text variant="body-sm" color="secondary">
              Updating...
            </Text>
          </RefreshIndicator>
        ) : (
          <RefreshIndicator aria-hidden="true">&nbsp;</RefreshIndicator>
        )}
      </CardListContainer>
    </main>
  );
};
export default DashboardContent;

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
  flex: 1;
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
