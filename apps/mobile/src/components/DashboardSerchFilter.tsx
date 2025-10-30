import React from "react";
import { TextInput } from "@chas/ui";
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
    <SearchFilterContainer
      role="search"
      aria-labelledby="search-heading"
      aria-describedby="search-description"
    >
      <ScreenReaderOnly as="h2" id="search-heading">
        Sök försändelser
      </ScreenReaderOnly>

      <ScreenReaderOnly id="search-description">
        Sök efter försändelser med ID, namn eller genom att skanna QR-kod
      </ScreenReaderOnly>

      <SearchContainer>
        <StyledTextInput
          label="Search by ID / name / QR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Sök försändelser med ID, namn eller QR-kod"
          aria-describedby="search-help"
          role="searchbox"
          type="search"
          autoComplete="off"
          placeholder="Ange ID, namn eller skanna QR..."
        />

        <ScreenReaderOnly id="search-help">
          Skriv för att söka bland dina försändelser eller använd QR-knappen
        </ScreenReaderOnly>

        <QrButtonContainer aria-label="QR-skanner funktioner">
          <QrButton />
        </QrButtonContainer>
      </SearchContainer>

      {children && (
        <FiltersContainer
          role="region"
          aria-label="Ytterligare filter och alternativ"
        >
          {children}
        </FiltersContainer>
      )}
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
`;

const FiltersContainer = styled.div`
  width: 100%;
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
