import { useCallback, useEffect, useMemo, useState } from "react";
import { useCamera } from "../hooks/useCamera";
import { useQRScanner } from "../hooks/useQRScanner";
import { useScanSearch } from "../hooks/useScanSearch";
import useDeliverOnScan from "./useDeliverOnScan";
import type { NavigateFunction } from "react-router";

type Mode = "search" | "add" | "deliver";

export function useScanController({
  mode,
  packageId,
  navigate,
}: {
  mode: Mode;
  packageId?: string;
  navigate: NavigateFunction;
}) {
  const { videoRef, cameraStarted, isLoading, error, startCamera, stopCamera } =
    useCamera();
  const {
    canvasRef,
    qrCodeResult,
    isActivelyScanning,
    hasTimedOut,
    beginQRScanning,
    stopQRScanning,
    resetQRScannerState,
  } = useQRScanner(videoRef);
  const { handleSearchScan } = useScanSearch();

  const [modalState, setModalState] = useState<{
    open: boolean;
    status: "success" | "error" | null;
  }>({ open: false, status: null });

  useEffect(() => {
    startCamera();
    return () => {
      stopQRScanning();
      stopCamera();
    };
  }, [startCamera, stopCamera, stopQRScanning]);

  useEffect(() => {
    if (
      cameraStarted &&
      !isActivelyScanning &&
      !qrCodeResult &&
      !modalState.open
    ) {
      beginQRScanning();
    }
  }, [
    cameraStarted,
    isActivelyScanning,
    qrCodeResult,
    modalState.open,
    beginQRScanning,
  ]);

  // open modal on result or timeout
  useEffect(() => {
    if (qrCodeResult || hasTimedOut) {
      setModalState({ open: true, status: qrCodeResult ? "success" : "error" });
    }
  }, [qrCodeResult, hasTimedOut]);

  const handleGoBack = useCallback(() => {
    stopQRScanning();
    stopCamera();
    navigate(-1);
  }, [stopQRScanning, stopCamera, navigate]);

  const handleRetry = useCallback(() => {
    setModalState({ open: false, status: null });
    resetQRScannerState();
    if (cameraStarted) {
      beginQRScanning();
    }
  }, [resetQRScannerState, cameraStarted, beginQRScanning]);

  const handleNext = useCallback(async () => {
    stopQRScanning();
    stopCamera();
    if (qrCodeResult && mode === "search") {
      await handleSearchScan(qrCodeResult);
    }
    if (qrCodeResult && mode === "add") {
      // keep behaviour consistent with previous code (no-op placeholder)
    }
    if (qrCodeResult && mode === "deliver") {
      navigate(-1);
    }
  }, [
    stopQRScanning,
    stopCamera,
    qrCodeResult,
    mode,
    handleSearchScan,
    navigate,
  ]);

  const closeModal = useCallback(() => {
    setModalState({ open: false, status: null });
  }, []);

  const displayText = useMemo(() => {
    if (isLoading) return "Starting camera...";
    return "Align QR code within the frame";
  }, [isLoading]);

  const { isDelivering } = useDeliverOnScan({
    qrCodeResult,
    packageId,
    mode,
    modalOpen: modalState.open,
    stopQRScanning,
    stopCamera,
    onSuccess: () => {
      setModalState({ open: true, status: "success" });
    },
    onError: () => {
      setModalState({ open: true, status: "error" });
    },
  });

  return {
    videoRef,
    canvasRef,
    cameraStarted,
    isLoading,
    error,
    isActivelyScanning,
    hasTimedOut,
    modalState,
    displayText,
    isDelivering,
    qrCodeResult,
    handleGoBack,
    handleRetry,
    handleNext,
    closeModal,
  } as const;
}

export default useScanController;
