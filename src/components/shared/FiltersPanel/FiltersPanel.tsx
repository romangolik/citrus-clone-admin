/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, PropsWithChildren } from "react";

import Filters from "./components/Filters";
import ContentBox from "@components/ui/ContentBox";
import SearchField from "./components/SearchField";

import "./FiltersPanel.scss";

interface FiltersPanelSubcomponents { 
  Filters: typeof Filters;
  Search: typeof SearchField;
}

type FiltersPanelProps = FC<PropsWithChildren> & FiltersPanelSubcomponents;

const FiltersPanel: FiltersPanelProps = ({ children }) => {
  let filtersElement = null;
  let searchElement = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if ((child.type as Function).name === "Filters") {
      filtersElement = child;
    }
    if ((child.type as Function).name === "SearchField") {
      searchElement = child;
    }
  });

  return (
    <ContentBox className="filters-panel df aic jcsb">
      {filtersElement && (
        <div className="filters-container">{filtersElement}</div>
      )}
      {searchElement && <div className="search-container">{searchElement}</div>}
    </ContentBox>
  );
};

FiltersPanel.Filters = Filters;
FiltersPanel.Search = SearchField;

export default FiltersPanel;
