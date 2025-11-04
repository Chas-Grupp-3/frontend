import { Text, Button } from "@chas/ui";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

interface DeliverModalProps {
  isDelivering?: boolean;
  status?: "success" | "error" | null;
  closeModal?: () => void;
  handleNext?: () => void;
}

const DeliverModal = ({
  isDelivering,
  status,
  handleNext,
}: DeliverModalProps) => {
  return (
    <div
      role="dialog"
      aria-labelledby="delivery-modal-title"
      aria-live="polite"
    >
      {isDelivering && (
        <div role="status" aria-label="Delivery in progress">
          <ClipLoader aria-label="Loading delivery process" />
          <Text variant="body-sm">Delivering...</Text>
        </div>
      )}
      {status === "success" && (
        <div role="alert" aria-live="assertive">
          <Text>Package Delivered</Text>
          <Text aria-label="Success message: The package has been successfully delivered">
            The package has been successfully delivered.
          </Text>
        </div>
      )}
      {status === "error" && (
        <div role="alert" aria-live="assertive">
          <Text>Delivery Failed</Text>
          <Text aria-label="Error message: Could not mark package as delivered, try again">
            Could not mark package as delivered, try again.
          </Text>
        </div>
      )}
      <ButtonGroup role="group" aria-label="Modal actions">
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

export default DeliverModal;

const ButtonGroup = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  & button {
    flex-shrink: 0;
  }
`;
