import * as Yup from "yup";

export const LOGIN_SHEMA = Yup.object({
  email: Yup.string().email("Не дійсний формат пошти").required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});