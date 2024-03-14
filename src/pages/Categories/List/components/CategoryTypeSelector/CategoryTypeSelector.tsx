import React, { FC } from "react";

import CheckboxSelector from "@components/ui/CheckboxSelector";

import { CATEGORY_TYPE_SELECTOR_OPTIONS } from "./data/category-type-selector-options";

const CategoryTypeSelector: FC = () => {
  return (
    <CheckboxSelector
      key="type"
      label="Тип"
      queryName="type"
      options={CATEGORY_TYPE_SELECTOR_OPTIONS}
    />
  );
};

export default CategoryTypeSelector;
