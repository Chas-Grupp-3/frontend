import React, { useCallback, useMemo, useState } from "react";
import { usePackages } from "../../hooks/usePackages";
import { packageService } from "../../services/packageService";
import {
  mapBackendPackageToCardInfo,
  sortPackages,
} from "../../utils/cardUtils";
import PackagesContext from "./PackagesContext";
import type { PackagesContextType } from "./PackagesContext";
import type { FilterOption } from "../../utils/dashboardUtils";
import { getFilterCounts, getFilteredCards } from "../../utils/dashboardUtils";

interface PackagesProviderProps {
  children: React.ReactNode;
  pollIntervalMs?: number | null;
}

export const PackagesProvider: React.FC<PackagesProviderProps> = ({
  children,
  pollIntervalMs = 30000, // Default 30s polling
}) => {
  const packagesHook = usePackages({ pollIntervalMs });

  // Filter and search state
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption["value"]>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Map backend data to card info and sort (delivered at bottom)
  const mappedData = useMemo(() => {
    if (!packagesHook.data) return null;
    const mapped = packagesHook.data.map(mapBackendPackageToCardInfo);
    return sortPackages(mapped);
  }, [packagesHook.data]);

  // Mark package as delivered
  const markAsDelivered = useCallback(
    async (packageId: string) => {
      await packageService.markPackageAsDelivered(packageId);
      packagesHook.refresh(); // Refresh data after delivery
    },
    [packagesHook]
  );

  // Get package by ID
  const getPackageById = useCallback(
    (packageId: string) => {
      return packagesHook.data?.find(
        (pkg) => String(pkg.package_id) === String(packageId)
      );
    },
    [packagesHook.data]
  );

  // Compute filtered packages
  const filteredPackages = useMemo(() => {
    if (!mappedData) return [];
    return getFilteredCards(mappedData, selectedFilter, searchTerm);
  }, [mappedData, selectedFilter, searchTerm]);

  // Compute filter counts
  const filterCounts = useMemo(() => {
    if (!mappedData) {
      return { all: 0, late: 0, "Temp issues": 0 };
    }
    return getFilterCounts(mappedData);
  }, [mappedData]);

  const contextValue: PackagesContextType = useMemo(
    () => ({
      mappedData,
      data: packagesHook.data,
      loading: packagesHook.loading,
      isRefreshing: packagesHook.isRefreshing,
      error: packagesHook.error,
      refresh: packagesHook.refresh,
      markAsDelivered,
      selectedFilter,
      setSelectedFilter,
      searchTerm,
      setSearchTerm,
      filteredPackages,
      filterCounts,
      getPackageById,
    }),
    [
      mappedData,
      packagesHook.data,
      packagesHook.loading,
      packagesHook.isRefreshing,
      packagesHook.error,
      packagesHook.refresh,
      markAsDelivered,
      selectedFilter,
      searchTerm,
      filteredPackages,
      filterCounts,
      getPackageById,
    ]
  );

  return (
    <PackagesContext.Provider value={contextValue}>
      {children}
    </PackagesContext.Provider>
  );
};
