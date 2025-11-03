import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors, Text } from "@chas/ui";

interface PackageDetailsHeaderProps {
  sender: string;
  packageId: number;
}

const PackageDetailsHeader = ({
  sender,
  packageId,
}: PackageDetailsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Header>
      <ArrowRow>
        <FaArrowLeft
          size={24}
          color={colors.accent}
          style={{ cursor: "pointer", position: "absolute", left: "1rem" }}
          onClick={() => navigate(-1)}
          aria-label="Go back to dashboard"
        />
      </ArrowRow>
      <Title>
        <Text variant="h1" color="accent">
          {sender || "Unknown Sender"}
        </Text>

        <Text color="accent" variant="body-sm">
          Package ID: {packageId}
        </Text>
      </Title>
    </Header>
  );
};

export default PackageDetailsHeader;
const ArrowRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.primary};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;
