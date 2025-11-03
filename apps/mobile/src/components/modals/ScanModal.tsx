import { Modal, Text, Button } from "@chas/ui";
import { styled } from "styled-components";
import SearchModal from "./scanModals/SearchModal";
import DeliverModal from "./scanModals/DeliverModal";

interface ScanModalProps {
  showModal: boolean;
  closeModal: () => void;
  qrCodeResult: string | null;
  handleRetry: () => void;
  handleGoBack: () => void;
  handleNext: () => void;
  mode: "search" | "add" | "deliver";
  status?: "success" | "error" | null;
  isDelivering?: boolean;
}

const ScanModal = ({
  showModal,
  closeModal,
  qrCodeResult,
  handleRetry,
  handleGoBack,
  handleNext,
  mode,
  status,
  isDelivering,
}: ScanModalProps) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={closeModal}
      aria-label={`Scan modal - ${mode} mode`}
    >
      <ModalContent role="main" aria-live="polite">
        {qrCodeResult ? (
          mode === "search" ? (
            <SearchModal
              qrCodeResult={qrCodeResult}
              handleNext={handleNext}
              closeModal={closeModal}
              aria-label="Search results modal"
            />
          ) : mode === "deliver" ? (
            <DeliverModal
              isDelivering={isDelivering}
              status={status}
              handleNext={handleNext}
              aria-label="Delivery status modal"
            />
          ) : mode === "add" ? (
            <>
              <Text variant="h1" aria-live="assertive">
                Package Added
              </Text>
              <Text aria-label="Success message: The package has been successfully added to your account">
                The package has been successfully added to your account.
              </Text>
            </>
          ) : (
            <>
              <Text variant="h1" aria-live="assertive">
                No QR Code Found
              </Text>
              <Text aria-label="Error message: Couldn't detect a valid QR code. Please try again or make sure the QR code is clear and well-lit">
                Couldn't detect a valid QR code. Please try again or make sure
                the QR code is clear and well-lit.
              </Text>
              <ButtonGroup role="group" aria-label="Retry options">
                <Button
                  onClick={handleRetry}
                  aria-label="Try scanning QR code again"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleGoBack}
                  aria-label="Go back to previous screen"
                >
                  Go Back
                </Button>
              </ButtonGroup>
            </>
          )
        ) : status === "error" ? (
          <>
            <Text variant="h1" aria-live="assertive">
              No QR Code Found
            </Text>
            <Text aria-label="Error message: Couldn't detect a valid QR code. Please try again or make sure the QR code is clear and well-lit">
              Couldn't detect a valid QR code. Please try again or make sure the
              QR code is clear and well-lit.
            </Text>
            <ButtonGroup role="group" aria-label="Retry options">
              <Button
                onClick={handleRetry}
                aria-label="Try scanning QR code again"
              >
                Try Again
              </Button>
              <Button
                onClick={handleGoBack}
                aria-label="Go back to previous screen"
              >
                Go Back
              </Button>
            </ButtonGroup>
          </>
        ) : null}
      </ModalContent>
    </Modal>
  );
};

export default ScanModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & button {
    flex-shrink: 0;
  }
`;
