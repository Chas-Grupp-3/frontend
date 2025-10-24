import React from "react";
import { colors, TextInput } from "@chas/ui";
import styled from "styled-components";
import QrButton from "./QrButton";

interface DashboardSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  children?: React.ReactNode;
}

const StyledTextInput = styled(TextInput)`
  width: 300px;

  input {
    padding-right: 8px 12px;
  }
`;

const DashboardSearchFilter = ({
  searchTerm,
  setSearchTerm,
  children,
}: DashboardSearchFilterProps) => {
  return (
    <SearchFilterContainer>
      <SearchContainer>
        <StyledTextInput
          label="Search by ID / name / QR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <QrButtonContainer>
          <QrButton />
        </QrButtonContainer>
      </SearchContainer>
      {children}
    </SearchFilterContainer>
  );
};

export default DashboardSearchFilter;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const QrButtonContainer = styled.div`
  position: absolute;
  right: 12px;
  color: ${colors.greyText};
`;
