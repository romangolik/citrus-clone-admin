import React, { FC } from "react";

import { MenuItem } from "@mui/material";

import { CategoryType, categoriesService } from "@services/categories";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";
import SelectFormField from "@components/ui/SelectFormField";

interface CategoryInfoProps {
  categoryId?: number;
}

const CategoryInfo: FC<CategoryInfoProps> = ({ categoryId }) => {
  const { data: categories = [] } =
    categoriesService.useGetAllCategoriesQuery();

  function getSelectItems() {
    const parentCategories = categories
      .map((category) => {
        if (
          category.id === categoryId ||
          category.type === CategoryType.PRODUCTS
        ) {
          return null;
        }

        return (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        );
      });

    return [
      <MenuItem key={"none"} value={null}>
        <em>None</em>
      </MenuItem>,
      ...parentCategories,
    ];
  }

  return (
    <ContentBox className="category-info">
      <ContentBox.Header>
        <ContentBox.Title>Інформація про категорію</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="category-info__content dg grid-gap15">
        <TextFormField name="name" label="Назва категорії" required />
        <TextFormField name="slug" label="Slug" required />
        <SelectFormField
          id="category-parent-id-select"
          name="parentId"
          label="Батьківська категорія">
          {getSelectItems()}
        </SelectFormField>
      </ContentBox.Content>
    </ContentBox>
  );
};

export default CategoryInfo;
