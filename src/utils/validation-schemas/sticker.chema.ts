import * as Yup from "yup";

export const STICKER_SCHEMA = Yup.object({
  title: Yup.string().required("Обов'язкове поле"),
  description: Yup.string().required("Обов'язкове поле"),
  image: Yup.string().required("Зображення є обов'язковим"),
});
