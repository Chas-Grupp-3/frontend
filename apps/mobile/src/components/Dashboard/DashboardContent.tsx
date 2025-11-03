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
    <>
      <DashboardHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        aria-label="Dashboard header with search"
      />

      <Centered
        role="region"
        aria-label="Filter packages"
        aria-describedby="filter-help"
      >
        <Toggle
          name="filters"
          options={toggleOptions}
          value={selectedFilter}
          onChange={(v) => setSelectedFilter(v as typeof selectedFilter)}
          iconSize="sm"
          aria-label={`Filter: ${selectedFilter}`}
          aria-describedby="filter-help"
        />
      </Centered>
      <CardListContainer
        role="region"
        aria-label="List of packages"
        aria-live="polite"
        aria-busy={loading}
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
              aria-label="Loading indicator"
            />
          </Centered>
        ) : (
          <>
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
              aria-label={`${filteredPackages.length} packages`}
              aria-describedby="package-info"
            />
          </>
        )}
        {isRefreshing ? (
          <RefreshIndicator
            role="status"
            aria-label="Updating packages"
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
    </>
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
