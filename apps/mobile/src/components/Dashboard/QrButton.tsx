import { Icon } from "@chas/ui";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/auth/useAuthContext";

interface QrButtonProps {
  size?: "sm" | "md" | "lg";
}

export const QrButton = ({ size = "sm" }: QrButtonProps) => {
  const navigate = useNavigate();
  const { role } = useAuthContext();
  const base = role ? `/${role}` : "";

  const handleClick = () => {
    navigate(`${base}/scan/search`);
  };

  return (
    <IconButton
      onClick={handleClick}
      aria-label="Open QR-scanner"
      role="button"
      aria-describedby="qr-button-description"
      tabIndex={0}
    >
      <Icon
        name="qrScan"
        size={size}
        aria-hidden="true"
        alt="QR code scanner icon"
      />
      <span
        id="qr-button-description"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
        }}
      >
        Click to open QR code scanner for package search
      </span>
    </IconButton>
  );
};

export default QrButton;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  aspect-ratio: 1;
  transition: transform 0.2s ease;
`;
