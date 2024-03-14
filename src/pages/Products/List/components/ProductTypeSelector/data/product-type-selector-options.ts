import { ProductType, ProductTypeLabel } from "@services/products";

import { CheckboxSelectorOption } from "@components/ui/CheckboxSelector";

export const PRODUCT_TYPE_SELECTOR_OPTIONS: CheckboxSelectorOption[] = [
  {
    label: ProductTypeLabel[ProductType.SIMPLE],
    value: ProductType.SIMPLE,
  },
  {
    label: ProductTypeLabel[ProductType.CONFIGURABLE],
    value: ProductType.CONFIGURABLE,
  },
];
