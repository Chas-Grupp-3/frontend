import { Text, Button } from "@chas/ui";
import { styled } from "styled-components";

interface SearchModalProps {
  qrCodeResult: string | null;
  handleNext: () => void;
  closeModal: () => void;
}
const SearchModal = ({
  qrCodeResult,
  handleNext,
  closeModal,
}: SearchModalProps) => {
  return (
    <div
      role="dialog"
      aria-labelledby="search-modal-title"
      aria-describedby="package-id-result"
    >
      <Text variant="h1" aria-label={`Package found with ID ${qrCodeResult}`}>
        Package with id:
        <Text
          variant="body"
          color="secondary"
          aria-label={`Package ID: ${qrCodeResult}`}
        >
          {qrCodeResult}
        </Text>
        found
      </Text>
      <ButtonGroup role="group" aria-label="Modal actions">
        <Button onClick={closeModal} aria-label="Cancel and close modal">
          Cancel
        </Button>
        <Button
          onClick={handleNext}
          aria-label="Navigate to package details page"
        >
          Go to package
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SearchModal;

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
