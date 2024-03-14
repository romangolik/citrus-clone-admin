import * as Yup from "yup";

export const PROFILE_SCHEMA = Yup.object({
  email: Yup.string().email().required("Обов'язкове поле"),
  name: Yup.string().required("Обов'язкове поле"),
  avatar: Yup.string().notRequired(),
  password: Yup.string().matches(/.{6,}/, {
    excludeEmptyString: true,
    message: "Мінімальна довжина 6 символів",
  }),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Паролі мають збігатися"
  ),
});
