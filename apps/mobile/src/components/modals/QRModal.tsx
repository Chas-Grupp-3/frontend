import { Modal, radius, Text } from "@chas/ui";
import encodeQR from "qr";
import { styled } from "styled-components";

interface QRModalProps {
  showModal: boolean;
  closeModal: () => void;
  qrCodeData: number | null;
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
    <Modal
      isOpen={showModal}
      onClose={closeModal}
      aria-label={
        qrCodeData
          ? `QR code modal for package ${qrCodeData}`
          : "QR code modal - no code available"
      }
    >
      {qrCodeData ? (
        <QR
          role="img"
          aria-label={`QR code container for package ${qrCodeData}`}
        >
          {qrSVG ? (
            <img
              width={255}
              height={255}
              src={
                qrSVG.startsWith("data:")
                  ? qrSVG
                  : `data:image/svg+xml;utf8,${encodeURIComponent(qrSVG)}`
              }
              alt={`QR code for package ${qrCodeData}`}
              aria-label={`Scannable QR code containing package ID ${qrCodeData}`}
            />
          ) : null}
        </QR>
      ) : (
        <Text aria-live="polite" aria-label="QR code unavailable message">
          No QR Code available
        </Text>
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
