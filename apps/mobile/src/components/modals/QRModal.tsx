import { Modal, radius, Text } from "@chas/ui";
import encodeQR from "qr";
import { styled } from "styled-components";

interface QRModalProps {
  showModal: boolean;
  closeModal: () => void;
  qrCodeData: string | null;
}

const QRModal = ({ showModal, closeModal, qrCodeData }: QRModalProps) => {
  const qrInput = qrCodeData ?? "";
  let qrSVG = "";
  try {
    qrSVG = encodeQR(String(qrInput), "svg");
  } catch (err) {
    console.error("Failed to generate QR:", err);
    qrSVG = "";
  }

  return (
    <Modal isOpen={showModal} onClose={closeModal}>
      {qrCodeData ? (
        <QR>
          {qrSVG ? (
            <img
              width={255}
              height={255}
              src={
                qrSVG.startsWith("data:")
                  ? qrSVG
                  : `data:image/svg+xml;utf8,${encodeURIComponent(qrSVG)}`
              }
              alt={`QR for ${qrCodeData}`}
            />
          ) : null}
        </QR>
      ) : (
        <Text>No QR Code available</Text>
      )}
    </Modal>
  );
};

export default QRModal;
const QR = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  border-radius: ${radius.box};
`;
