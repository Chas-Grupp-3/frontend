import { useEffect, useState, useCallback, useMemo } from "react";
import { useCamera } from "../hooks/useCamera";
import { useQRScanner } from "../hooks/useQRScanner";
import Camera from "../components/Camera";
import { Button, colors, Text } from "@chas/ui";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import ScanModal from "../components/modals/ScanModal";
import { useScanSearch } from "../hooks/useScanSearch";
interface ScanProps {
  mode: "search" | "add" | "deliver";
}

const Scan = ({ mode = "search" }: ScanProps) => {
  const navigate = useNavigate();
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

  const [showModal, setShowModal] = useState(false);

  const handleGoBack = useCallback(() => {
    stopQRScanning();
    stopCamera();
    navigate(-1);
  }, [stopQRScanning, stopCamera, navigate]);

  const handleRetry = useCallback(() => {
    setShowModal(false);
    resetQRScannerState();
    if (cameraStarted) {
      beginQRScanning();
    }
  }, [resetQRScannerState, cameraStarted, beginQRScanning]);

  const handleNext = useCallback(async () => {
    stopQRScanning();
    stopCamera();
    if (qrCodeResult) {
      await handleSearchScan(qrCodeResult);
    }
  }, [stopQRScanning, stopCamera, qrCodeResult, handleSearchScan]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const displayText = useMemo(() => {
    if (isLoading) return "Starting camera...";
    return "Align QR code within the frame";
  }, [isLoading]);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    if (cameraStarted && !isActivelyScanning && !qrCodeResult && !showModal) {
      beginQRScanning();
    }
  }, [
    cameraStarted,
    isActivelyScanning,
    qrCodeResult,
    showModal,
    beginQRScanning,
  ]);

  // Handle scan results
  useEffect(() => {
    if (qrCodeResult || hasTimedOut) {
      setShowModal(true);
    }
  }, [qrCodeResult, hasTimedOut]);

  // Early return for error state
  if (error) {
    return (
      <Container className="page">
        <Text variant="body-lg" color="accent">
          {error}
        </Text>
        <Button onClick={handleGoBack}>Close</Button>
      </Container>
    );
  }

  return (
    <Container className="page">
      <TextContainer>
        <Text variant="body-lg" color="accent">
          {displayText}
        </Text>
        {isActivelyScanning && (
          <Text variant="body-sm" color="secondary">
            Scanning...
          </Text>
        )}
      </TextContainer>

      <Camera
        videoRef={videoRef}
        canvasRef={canvasRef}
        cameraStarted={cameraStarted}
      />

      <ButtonContainer>
        <Button onClick={handleGoBack}>Close</Button>
      </ButtonContainer>
      {mode === "search" && (
        <ScanModal
          showModal={showModal}
          closeModal={closeModal}
          qrCodeResult={qrCodeResult}
          handleRetry={handleRetry}
          handleGoBack={handleGoBack}
          handleNext={handleNext}
        />
      )}
    </Container>
  );
};

export default Scan;

const Container = styled.div`
  background-color: ${colors.blueText};
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 30%;
  padding-bottom: 30%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;
