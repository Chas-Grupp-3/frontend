import { colors, Text } from "@chas/ui";
import styled from "styled-components";
import DashboardSerchFilter from "./DashboardSerchFilter";
import DashboardLogo from "./DashboardLogo";

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Header>
      <DashboardLogo />
      <Text color="whiteBackground" variant="body-lg">
        My shipments
      </Text>

      <DashboardSerchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Header>
  );
};

export default DashboardHeader;

const Header = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: ${colors.primary};
  gap: 2rem;
`;
