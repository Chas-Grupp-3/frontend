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
    <>
      <Text variant="h1">
        Package with id:
        <Text variant="body" color="secondary">
          {qrCodeResult}
        </Text>
        found
      </Text>
      <ButtonGroup>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleNext}>Go to package</Button>
      </ButtonGroup>
    </>
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
