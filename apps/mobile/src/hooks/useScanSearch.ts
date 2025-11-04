import { useNavigate } from "react-router";
import { packageService } from "../services/packageService";
import { useAuthContext } from "../context/auth/useAuthContext";

export const useScanSearch = () => {
  const navigate = useNavigate();
  const { role } = useAuthContext();
  const base = role ? `/${role}` : "";

  const handleSearchScan = async (qrCode: string) => {
    const foundPackage = await packageService.fetchPackageById(qrCode);
    console.log("Found package:", foundPackage);
    navigate(`${base}/package/${qrCode}`, {
      state: { packageData: foundPackage },
    });
  };

  return { handleSearchScan, label: "Scan to search for a package" };
};
