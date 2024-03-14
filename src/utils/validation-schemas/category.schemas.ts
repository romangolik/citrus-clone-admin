import * as Yup from "yup";

import { CategoryType } from "@services/categories";

import { SLUG_SСHEMA } from "./shared.schemas";

const BASE_CATEGORY_SCHEMA = Yup.object({
  published: Yup.boolean(),
  name: Yup.string().required("Обов'язкове поле"),
  slug: SLUG_SСHEMA,
  image: Yup.string().required("Зображення є обов'язковим"),
  icon: Yup.string().notRequired(),
  parentId: Yup.number().notRequired(),
});

export const CREATE_CATEGORY_SCHEMA = BASE_CATEGORY_SCHEMA.shape({
  type: Yup.mixed<CategoryType>()
    .oneOf(Object.values(CategoryType))
    .required("Тип створюваної категорії є обов'язковим"),
});

export const EDIT_CATEGORY_SCHEMA = BASE_CATEGORY_SCHEMA;
