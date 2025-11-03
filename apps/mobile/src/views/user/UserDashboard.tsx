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
import { getHardcodedCards, sortCardsByPriority } from "../../utils/cardUtils";

const Dashboard = () => {
  const { loading, refresh } = usePackages({
    pollIntervalMs: null,
    defaultThreshold: 10,
  });
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const mappedPackages: CardInfo[] = useMemo(() => {
    console.log("UserDashboard: Using hardcoded cards for testing");
    return sortCardsByPriority(getHardcodedCards());
  }, []);

  const packages: BackendPackage[] = useMemo(() => {
    return mappedPackages.map(
      (card) =>
        ({
          package_id: card.id,
          sender: card.title,
          temperature: String(card.temperature),
          humidity: String(card.humidity),
          delivered: card.deliveryStatus === "delivered",
          arrival_date: card.ETA,
        }) as BackendPackage
    );
  }, [mappedPackages]);

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
    icon: o.icon,
    count: counts[o.value] ?? 0,
  }));

  console.log("UserDashboard - Mapped packages:", mappedPackages);
  console.log("UserDashboard - Filtered packages:", filteredPackages);

  return (
    <DashboardContainer
      className="page"
      role="main"
      aria-label="Kunddashboard för paketöversikt"
    >
      <DashboardHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Centered role="region" aria-label="Filtrera paket">
        <Toggle
          name="filters"
          options={toggleOptions}
          value={selectedFilter}
          onChange={(v) => setSelectedFilter(v as FilterOption["value"])}
          iconSize="sm"
          aria-label={`Aktuellt filter: ${selectedFilter}`}
        />
      </Centered>
      <CardListContainer
        role="region"
        aria-label="Lista över paket"
        aria-live="polite"
      >
        {loading ? (
          <Centered role="status" aria-label="Laddar paket">
            <ClipLoader size={64} color={colors.primary} />
          </Centered>
        ) : (
          <>
            <p>Antal kort: {filteredPackages.length}</p>
            <CardList
              cards={filteredPackages}
              variant="small"
              onCardClick={(packageId) => {
                console.log("UserDashboard - Clicked package:", packageId);
                navigate(`package/${packageId}`, {
                  state: {
                    packageData: packages.find(
                      (pkg) => String(pkg.package_id) === String(packageId)
                    ),
                  },
                });
              }}
              aria-label={`${filteredPackages.length} paket`}
            />
          </>
        )}
      </CardListContainer>
      <Centered role="region" aria-label="Uppdatera paket">
        <Button
          onClick={() => {
            console.log("UserDashboard - Refresh clicked");
            refresh();
          }}
          disabled={loading}
          aria-label={loading ? "Uppdaterar..." : "Uppdatera paketlista"}
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
