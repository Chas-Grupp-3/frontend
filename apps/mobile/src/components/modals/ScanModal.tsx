import { Modal, Text, Button } from "@chas/ui";
import { styled } from "styled-components";

interface ScanModalProps {
  showModal: boolean;
  closeModal: () => void;
  qrCodeResult: string | null;
  handleRetry: () => void;
  handleGoBack: () => void;
  handleNext: () => void;
}

const ScanModal = ({
  showModal,
  closeModal,
  qrCodeResult,
  handleRetry,
  handleGoBack,
  handleNext,
}: ScanModalProps) => {
  return (
    <Modal isOpen={showModal} onClose={closeModal}>
      <ModalContent>
        {qrCodeResult ? (
          <>
            <Text variant="h1">
              Package with id:
              <Text variant="h3" color="secondary">
                {qrCodeResult}
              </Text>
              found
            </Text>
            <ButtonGroup>
              <Button onClick={handleNext}>Go to package </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </ButtonGroup>
          </>
        ) : (
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
        )}
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
