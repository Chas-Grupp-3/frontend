import React from "react";
import { TextInput } from "@chas/ui";
import styled from "styled-components";
import QrButton from "./QrButton";

interface DashboardSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  children?: React.ReactNode;
}

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
        Search Shipments
      </ScreenReaderOnly>

      <ScreenReaderOnly id="search-description">
        Search for shipments by ID, name, or QR code. Use the QR button to scan
        a code.
      </ScreenReaderOnly>

      <SearchContainer>
        <TextInput
          inputSize="search"
          label="Search by ID / name / QR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search shipments by ID, name, or QR code"
          aria-describedby="search-help"
          role="searchbox"
          type="search"
          autoComplete="off"
          placeholder="Enter ID, name, or scan QR..."
        />

        <ScreenReaderOnly id="search-help">
          Type to search for your shipments or use the QR button
        </ScreenReaderOnly>

        <QrButtonContainer aria-label="QR scanner functions">
          <QrButton />
        </QrButtonContainer>
      </SearchContainer>

      {children && (
        <FiltersContainer
          role="region"
          aria-label="Additional filters and options"
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
  flex: 1;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const QrButtonContainer = styled.div`
  position: absolute;
  transform: translateY(-5%);
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
