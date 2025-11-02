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
    <SearchFilterContainer>
      <SearchContainer>
        <TextInput
          inputSize="search"
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
