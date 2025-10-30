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
    <Modal isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        {qrCodeResult ? (
          mode === "search" ? (
            <SearchModal
              qrCodeResult={qrCodeResult}
              handleNext={handleNext}
              closeModal={closeModal}
            />
          ) : mode === "deliver" ? (
            <DeliverModal
              isDelivering={isDelivering}
              status={status}
              handleNext={handleNext}
            />
          ) : mode === "add" ? (
            <>
              <Text variant="h1">Package Added</Text>
              <Text>
                The package has been successfully added to your account.
              </Text>
            </>
          ) : (
            // fallback for unexpected mode when there's a qrCodeResult
            <>
              <Text variant="h1">No QR Code Found</Text>
              <Text>
                Couldn't detect a valid QR code. Please try again or make sure
                the QR code is clear and well-lit.
              </Text>
              <ButtonGroup>
                <Button onClick={handleRetry}>Try Again</Button>
                <Button onClick={handleGoBack}>Go Back</Button>
              </ButtonGroup>
            </>
          )
        ) : // When there's no qrCodeResult, render the "No QR Code Found" UI if status indicates an error (e.g., scanner timeout)
        status === "error" ? (
          <>
            <Text variant="h1">No QR Code Found</Text>
            <Text>
              Couldn't detect a valid QR code. Please try again or make sure the
              QR code is clear and well-lit.
            </Text>
            <ButtonGroup>
              <Button onClick={handleRetry}>Try Again</Button>
              <Button onClick={handleGoBack}>Go Back</Button>
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
