import { useContext } from "react";
import type { PackagesContextType } from "./PackagesContext";
import PackagesContext from "./PackagesContext";

export const usePackagesContext = (): PackagesContextType => {
  const ctx = useContext(PackagesContext);
  if (!ctx) {
    throw new Error(
      "usePackagesContext must be used within a PackagesProvider"
    );
  }
  return ctx;
};
