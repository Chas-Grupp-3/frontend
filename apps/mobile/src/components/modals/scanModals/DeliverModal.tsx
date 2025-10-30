import { Text } from "@chas/ui";
import { ClipLoader } from "react-spinners";

interface DeliverModalProps {
  isDelivering?: boolean;
  status?: "success" | "error" | null;
}

const DeliverModal = ({ isDelivering, status }: DeliverModalProps) => {
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
    </>
  );
};

export default DeliverModal;
