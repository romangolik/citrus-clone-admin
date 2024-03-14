import React, { FC } from "react";

import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { usersService, UpdateUserDto } from "@services/users";

import Icon from "@components/ui/Icon";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import TextFormField from "@components/ui/TextFormField";
import ProfileAvatarUploader from "./components/ProfileAvatarUploader";

import { useAuth } from "@utils/hooks/useAuth";
import { PROFILE_SCHEMA } from "@utils/validation-schemas/profile.schema";

import "./Profile.scss";

interface ProfileFormProps extends UpdateUserDto {
  email: string;
}

const Profile: FC = () => {
  const { user } = useAuth();
  const form = useForm<ProfileFormProps>({
    mode: "onSubmit",
    values: {
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(PROFILE_SCHEMA),
  });

  const [updateProfile, { isLoading }] = usersService.useUpdateProfileMutation();

  async function onSubmitHandler(data: UpdateUserDto) {
    updateProfile(data)
      .unwrap()
      .then(() => {
        form.resetField("password");
        form.resetField("passwordConfirmation");
      })
      .catch(console.error);
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="profile-page">
        <PageLayout.Header className="aic">
          <PageLayout.Title>Редагування профілю</PageLayout.Title>
          <LoadingButton
            color="success"
            variant="contained"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<Icon name="save" size="fill" />}
            onClick={form.handleSubmit(onSubmitHandler)}>
            Зберегти
          </LoadingButton>
        </PageLayout.Header>
        <PageLayout.Content className="profile-page__content">
          <ContentBox className="profile-info">
            <ContentBox.Header>
              <ContentBox.Title>Особисті дані</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content className="profile-info__content df aic gap30">
              <ProfileAvatarUploader imageUrl={user?.avatar} />
              <div className="profile-info__fields">
                <TextFormField
                  name="email"
                  label="Пошта"
                  readOnly
                />
                <TextFormField name="name" label="Ім'я" />
                <TextFormField
                  name="password"
                  label="Новий пароль"
                  type="password"
                />
                <TextFormField
                  name="passwordConfirmation"
                  label="Повторіть пароль"
                  type="password"
                />
              </div>
            </ContentBox.Content>
          </ContentBox>
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default Profile;
