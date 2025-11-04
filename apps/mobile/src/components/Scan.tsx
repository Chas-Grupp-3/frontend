import { Button, Text, colors } from "@chas/ui";
import { useNavigate } from "react-router";
import Camera from "../components/Camera";
import ScanModal from "../components/modals/ScanModal";
import useScanController from "../hooks/useScanController";
import { styled } from "styled-components";

interface ScanProps {
  mode: "search" | "add" | "deliver";
  packageId?: string;
}

const Scan = ({ mode = "search", packageId }: ScanProps) => {
  const navigate = useNavigate();
  const {
    videoRef,
    canvasRef,
    cameraStarted,
    error,
    isActivelyScanning,
    modalState,
    displayText,
    isDelivering,
    qrCodeResult,
    handleGoBack,
    handleRetry,
    handleNext,
    closeModal,
  } = useScanController({ mode, packageId, navigate });

  if (error) {
    return (
      <Container
        className="page"
        role="alert"
        aria-label="Scanner error screen"
      >
        <Text
          variant="body-lg"
          color="accent"
          aria-label={`Error message: ${error}`}
        >
          {error}
        </Text>
        <Button
          onClick={handleGoBack}
          aria-label="Close scanner and return to previous screen"
        >
          Close
        </Button>
      </Container>
    );
  }

  return (
    <Container
      className="page"
      role="main"
      aria-label={`QR code scanner in ${mode} mode`}
    >
      <TextContainer
        role="status"
        aria-live="polite"
        aria-label="Scanner status information"
      >
        <Text
          variant="body-lg"
          color="accent"
          aria-label={`Scanner instruction: ${displayText}`}
        >
          {displayText}
        </Text>
        {isActivelyScanning && (
          <Text
            variant="body-sm"
            color="secondary"
            aria-label="Scanning in progress"
            aria-live="assertive"
          >
            Scanning...
          </Text>
        )}
      </TextContainer>

      <Camera
        videoRef={videoRef}
        canvasRef={canvasRef}
        cameraStarted={cameraStarted}
        aria-label="QR code scanner camera interface"
      />

      <ButtonContainer role="group" aria-label="Scanner controls">
        <Button
          onClick={handleGoBack}
          aria-label="Close scanner and return to previous screen"
        >
          Close
        </Button>
      </ButtonContainer>

      <ScanModal
        mode={mode}
        showModal={modalState.open}
        status={modalState.status}
        closeModal={closeModal}
        qrCodeResult={qrCodeResult}
        handleRetry={handleRetry}
        handleGoBack={handleGoBack}
        handleNext={handleNext}
        isDelivering={isDelivering}
        aria-label="Scanner result modal"
      />
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
