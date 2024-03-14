import { AttributeType } from "@services/attributes";

import { SLUG_SСHEMA } from "./shared.schemas";

import Yup from "@utils/helpers/extendYupApi";

export const ATTRIBUTE_VALUE_SCHEMA = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  slug: SLUG_SСHEMA,
  isFilter: Yup.boolean().default(false),
});

export const ATTRIBUTE_SCHEMA = Yup.object({
  name: Yup.string().required("Обов'язкове поле"),
  slug: SLUG_SСHEMA,
  comparable: Yup.boolean(),
  active: Yup.boolean(),
  isMain: Yup.boolean(),
  type: Yup.mixed<AttributeType>()
    .oneOf(Object.values(AttributeType))
    .required("Обов'язкове поле"),
  attributeGroupId: Yup.number().notRequired().default(undefined),
  values: Yup.array().when("type", {
    is: (type: AttributeType) => {
      return type === AttributeType.COMBOBOX || type === AttributeType.LIST;
    },
    then: (schema) => {
      return schema
        .min(1)
        .of(
          Yup.object()
            .shape(ATTRIBUTE_VALUE_SCHEMA.fields)
            .uniqueProperty("title", "Дане значення уже існує")
        );
    },
    otherwise: (schema) => {
      return schema.length(0);
    },
  }),
});
