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
    <Header
      role="banner"
      aria-labelledby="dashboard-title"
      aria-describedby="dashboard-description"
    >
      <ScreenReaderOnly id="dashboard-description">
        Dashboard header med logotyp, titel och sökfunktion för dina
        försändelser
      </ScreenReaderOnly>
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

const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
