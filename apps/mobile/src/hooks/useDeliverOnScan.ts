import { useEffect, useState } from "react";
import { packageService } from "../services/packageService";
import { isApiError } from "../types/apiTypes";
import type { BackendPackage } from "../types/packageTypes";

type Mode = "search" | "add" | "deliver";

type Params = {
  qrCodeResult?: string | null;
  packageId?: string;
  mode: Mode;
  modalOpen: boolean;
  stopQRScanning: () => void;
  stopCamera: () => void;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};

export const useDeliverOnScan = ({
  qrCodeResult,
  packageId,
  mode,
  modalOpen,
  stopQRScanning,
  stopCamera,
  onSuccess,
  onError,
}: Params) => {
  const [isDelivering, setIsDelivering] = useState(false);

  useEffect(() => {
    if (!qrCodeResult || !packageId || mode !== "deliver" || modalOpen) return;
    if (qrCodeResult !== packageId) return;

    let cancelled = false;

    const tryAutoDeliver = async () => {
      setIsDelivering(true);
      stopQRScanning();
      stopCamera();

      try {
        const result = await packageService.markPackageAsDelivered(packageId);

        if (cancelled) return;
        setIsDelivering(false);

        if (isApiError(result)) {
          onError?.(result);
          return;
        }
        if (result && (result as BackendPackage).delivered === true) {
          onSuccess?.();
        } else {
          onError?.(
            new Error("markPackageAsDelivered returned unexpected payload")
          );
        }
      } catch (err) {
        if (cancelled) return;
        setIsDelivering(false);
        onError?.(err);
      }
    };

    tryAutoDeliver();

    return () => {
      cancelled = true;
    };
  }, [
    qrCodeResult,
    packageId,
    mode,
    modalOpen,
    stopQRScanning,
    stopCamera,
    onSuccess,
    onError,
  ]);

  return { isDelivering };
};

export default useDeliverOnScan;
