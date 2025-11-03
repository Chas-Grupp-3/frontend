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
    <IconButton onClick={handleClick} aria-label="Open QR-scanner">
      <Icon name="qrScan" size={size} />
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
