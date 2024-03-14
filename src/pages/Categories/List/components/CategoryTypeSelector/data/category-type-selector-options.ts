import {
  CategoryType,
  CategoryTypeTitles,
} from "@services/categories";

import { CheckboxSelectorOption } from "@components/ui/CheckboxSelector";


export const CATEGORY_TYPE_SELECTOR_OPTIONS: CheckboxSelectorOption[] = [
  {
    label: CategoryTypeTitles[CategoryType.PRODUCTS],
    value: CategoryType.PRODUCTS,
  },
  {
    label: CategoryTypeTitles[CategoryType.CATEGORIES],
    value: CategoryType.CATEGORIES,
  },
];
