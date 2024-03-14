import { FC, useState } from "react";

import { CategoryType, categoriesService } from "@services/categories";

import CheckboxSelector from "@components/ui/CheckboxSelector";

import { useDebounceCallback } from "@utils/hooks/useDebounceCallback";

import "./ProductCategorySelector.scss";

interface ProductCategorySelectorProps {}

const ProductCategorySelector: FC<ProductCategorySelectorProps> = () => {
  const [categoriesSearch, setCategoriesSearch] = useState("");

  const debouncedSearch = useDebounceCallback(setCategoriesSearch, 300);

  const { data: categories = [] } = categoriesService.useGetAllCategoriesQuery({
    type: CategoryType.PRODUCTS,
    search: categoriesSearch,
  });

  const selectorOptions = categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }));

  return (
    <CheckboxSelector
      enableSearch
      key="categories"
      label="Категорія"
      queryName="categories"
      options={selectorOptions}
      onSearchChange={debouncedSearch}
    />
  );
};

export default ProductCategorySelector;
