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
    <>
      {isDelivering && (
        <>
          <ClipLoader />
          <Text variant="body-sm">Delivering...</Text>
        </>
      )}
      {status === "success" && (
        <>
          <Text variant="h1">Package Delivered</Text>
          <Text>The package has been successfully delivered.</Text>
        </>
      )}
      {status === "error" && (
        <>
          <Text variant="h1">Delivery Failed</Text>
          <Text>Could not mark package as delivered, try again.</Text>
        </>
      )}
      <ButtonGroup>
        <Button onClick={handleNext}>Go to package</Button>
      </ButtonGroup>
    </>
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
