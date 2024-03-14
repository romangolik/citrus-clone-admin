import React, { FC } from "react";

import classNames from "classnames";

import {
  CategoryTypeTitles,
  CategoryType as CategoryTypeEnum,
} from "@services/categories";

import "./CategoryType.scss";

interface CategoryTypeProps {
  type: CategoryTypeEnum;
}

const CategoryType: FC<CategoryTypeProps> = ({ type }) => {
  return (
    <p
      className={classNames("category-type df aic jcc fz17", {
        "category-type_products": type === CategoryTypeEnum.PRODUCTS,
        "category-type_categories": type === CategoryTypeEnum.CATEGORIES,
      })}>
      {CategoryTypeTitles[type]}
    </p>
  );
};

export default CategoryType;
