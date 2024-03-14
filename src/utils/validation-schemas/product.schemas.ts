import {
  SimpleProductDto,
  ProductOptionType,
  AvailabilityStatus,
  ConfigurableProductDto,
} from "@services/products";

import { SLUG_SСHEMA } from "./shared.schemas";

import Yup from "@utils/helpers/extendYupApi";

const BASIC_INFO_SCHEMA = {
  name: Yup.string().required("Обов'язкове поле"),
  slug: SLUG_SСHEMA,
  price: Yup.number()
    .typeError("Ціна має бути числом")
    .required("Обов'язкове поле")
    .min(0, "Ціна має бути більшою або дорівнювати 0")
    .moreThan(
      Yup.ref("discountPrice"),
      "Ціна не може бути меншою за акційну ціну"
    ),
  discountPrice: Yup.number()
    .optional()
    .nullable()
    .when(([discountPrice]) => {
      if (discountPrice) {
        return Yup.number()
          .typeError("Ціна має бути числом")
          .min(0, "Акційна ціна має бути більшою або дорівнювати 0");
      } else {
        return Yup.number()
          .transform((_, value) => {
            if (!value) {
              return null;
            }
            return value;
          })
          .nullable()
          .optional();
      }
    }),
  sku: Yup.string().required("Обов'язкове поле"),
};

const RATING_SCHEMA = Yup.number()
  .typeError("Рейтинг має бути числом")
  .required("Обов'язкове поле")
  .min(0, "Рейтинг має бути не менше 0")
  .max(5, "Рейтинг має бути не більше 5")
  .decimal("Рейтинг може мати максимум два знаки після коми")
  .positive("Рейтинг має бути додатним числом");

const STATUS_SCHEMA = Yup.mixed<AvailabilityStatus>()
  .oneOf(Object.values(AvailabilityStatus))
  .required("Обов'язкове поле");

const PROPERTIES_SCHEMA = Yup.array()
  .required()
  .of(
    Yup.object().shape({
      id: Yup.number().optional(),
      attributeId: Yup.number().required(),
      value: Yup.mixed().when(([value]) => {
        if (Array.isArray(value)) {
          return Yup.array().min(1, "Обов'язкове поле");
        } else {
          return Yup.string().required("Обов'язкове поле");
        }
      }),
    })
  );

const BASE_PRODUCT_SCHEMA = Yup.object().shape({
  ...BASIC_INFO_SCHEMA,
  published: Yup.boolean().required(),
  categoryId: Yup.number().required("Обов'язкове поле"),
  warranty: Yup.number()
    .typeError("Гарантія має бути числом")
    .required("Обов'язкове поле")
    .min(1, "Гарантія має бути не менше 1")
    .positive("Гарантія має бути додатним числом"),
  stickers: Yup.array().required(),
  description: Yup.string().optional(),
  images: Yup.array()
    .min(1, "Товар повинен містити щонайменше 1 зображення")
    .required(),
  properties: PROPERTIES_SCHEMA,
  metaDescription: Yup.string().optional().nullable(),
  metaKeywords: Yup.string().optional().nullable(),
});

const PRODUCT_OPTION_VALUE_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Обов'язкове поле"),
  value: Yup.string().required("Обов'язкове поле"),
  images: Yup.array().of(Yup.number()),
});

export const PRODUCT_OPTION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Обов'язкове поле"),
  type: Yup.mixed<ProductOptionType>()
    .oneOf(Object.values(ProductOptionType))
    .required("Обов'язкове поле"),
  values: Yup.array()
    .min(1, "Обов'язкове поле")
    .of(Yup.object().shape(PRODUCT_OPTION_VALUE_SCHEMA.fields)),
});

export const PRODUCT_VARIANT_SCHEMA = Yup.object().shape({
  ...BASIC_INFO_SCHEMA,
  rating: RATING_SCHEMA,
  status: STATUS_SCHEMA,
  properties: PROPERTIES_SCHEMA,
  optionValues: Yup.array().of(
    Yup.object().shape(PRODUCT_OPTION_VALUE_SCHEMA.fields)
  ),
});

export const SIMPLE_PRODUCT_SCHEMA = BASE_PRODUCT_SCHEMA.shape({
  rating: RATING_SCHEMA,
  status: STATUS_SCHEMA,
}) as Yup.ObjectSchema<SimpleProductDto>;

export const CONFIGURABLE_PRODUCT_SCHEMA = BASE_PRODUCT_SCHEMA.shape({
  options: Yup.array()
    .min(1, "Повинна існувати щонайменше 1 опція")
    .of(Yup.object().shape(PRODUCT_OPTION_SCHEMA.fields)),
  variants: Yup.array()
    .min(1, "Повинен існувати щонайменше 1 варіант")
    .of(
      Yup.object()
        .shape(PRODUCT_VARIANT_SCHEMA.fields)
        .uniqueProperties([
          ["name", "Назва має бути унікальним значенням"],
          ["slug", "Slug має бути унікальним значенням"],
          ["sku", "SKU має бути унікальним значенням"],
        ])
    ),
}) as Yup.ObjectSchema<ConfigurableProductDto>;
