import { FC } from "react";

import { MenuItem } from "@mui/material";

import { CategoryType, categoriesService } from "@services/categories";

import ConfirmationSelectFormField from "@components/ui/ConfirmationSelectFormField";

interface CategorySelectProps {
  onChange?: (vaue: number) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({ onChange }) => {
  const { data: categories = [] } = categoriesService.useGetAllCategoriesQuery({
    type: CategoryType.PRODUCTS,
  });

  function changeHandler(value: string) {
    if (onChange) {
      onChange(+value);
    }
  }

  return (
    <ConfirmationSelectFormField
      id="product-category-select"
      name="categoryId"
      label="Категорія"
      required
      confirmationMessage="При зміні категорії дані про поточні характеристики буде видаленно"
      onChange={changeHandler}>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </ConfirmationSelectFormField>
  );
};

export default CategorySelect;
