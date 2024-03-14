import * as Yup from "yup";

export const SLUG_SСHEMA = Yup.string()
  .required("Обов'язкове поле")
  .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Невірний формат поля");
