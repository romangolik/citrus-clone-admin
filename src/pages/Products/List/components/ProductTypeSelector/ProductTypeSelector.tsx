import { FC } from "react";

import CheckboxSelector from "@components/ui/CheckboxSelector";

import { PRODUCT_TYPE_SELECTOR_OPTIONS } from "./data/product-type-selector-options";

const ProductTypeSelector: FC = () => {
  return (
    <CheckboxSelector
      key="type"
      label="Тип"
      queryName="type"
      options={PRODUCT_TYPE_SELECTOR_OPTIONS}
    />
  );;
};

export default ProductTypeSelector;