import React, { FC } from "react";

import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { authService } from "@services/auth";

import TextFormField from "@components/ui/TextFormField";
import PasswordFormField from "@components/ui/PasswordFormField";

import { LOGIN_SHEMA } from "@utils/validation-schemas/login.schema";

import logo from "@assets/images/logo.svg";

import "./Login.scss";

const DEFAULT_FORM_STATE = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const [login, { isLoading }] = authService.useLoginMutation();

  const form = useForm({
    mode: "onSubmit",
    defaultValues: DEFAULT_FORM_STATE,
    resolver: yupResolver(LOGIN_SHEMA),
  });

  return (
    <div className="login-page">
      <div className="login-page__content">
        <img className="login-page__logo" src={logo} alt="Logo" />
        <h5 className="login-page__title">Вхід до адмінпанелі</h5>
        <FormProvider {...form}>
          <form
            className="login-page__form df fdc gap20"
            onSubmit={form.handleSubmit(login)}>
            <TextFormField name="email" label="Пошта" fullWidth />
            <PasswordFormField name="password" label="Пароль" fullWidth />
            <LoadingButton
              color="success"
              type="submit"
              variant="contained"
              className="login-page__button"
              loading={isLoading}>
              Увійти
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
