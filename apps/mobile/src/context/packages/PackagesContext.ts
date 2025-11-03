import { createContext } from "react";
import type { CardInfo, BackendPackage } from "../../types/packageTypes";
import type { FilterOption } from "../../utils/dashboardUtils";

export interface PackagesContextType {
  mappedData: CardInfo[] | null;
  data: BackendPackage[] | null;
  loading: boolean;
  error: Error | null;
  isRefreshing: boolean;

  refresh: () => void;
  markAsDelivered: (packageId: string) => Promise<void>;

  selectedFilter: FilterOption["value"];
  setSelectedFilter: (filter: FilterOption["value"]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredPackages: CardInfo[];
  filterCounts: Record<FilterOption["value"], number>;

  getPackageById: (packageId: string) => BackendPackage | undefined;
}

const PackagesContext = createContext<PackagesContextType | null>(null);

export default PackagesContext;
