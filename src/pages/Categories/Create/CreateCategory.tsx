import React, { FC } from "react";

import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { CreateCategoryDto, categoriesService } from "@services/categories";

import Icon from "@components/ui/Icon";
import Link from "@components/ui/Link";
import Switch from "@components/ui/Switch";
import ContentBox from "@components/ui/ContentBox";
import CategoryInfo from "../components/CategoryInfo";
import PageLayout from "@components/layout/PageLayout";
import CategoryIconUploader from "../components/CategoryIconUploader";
import CategoryImageUploader from "../components/CategoryImageUploader";
import CategoryTypeRadioGroup from "./components/CategoryTypeRadioGroup";

import { Routes } from "@router/routes";

import { CREATE_CATEGORY_SCHEMA } from "@utils/validation-schemas/category.schemas";

import "./CreateCategory.scss";

const DEFAULT_FORM_STATE: CreateCategoryDto = {
  name: "",
  slug: "",
  type: null,
  parentId: null,
  image: null,
  icon: null,
  published: false,
};

const CreateCategory: FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_FORM_STATE,
    resolver: yupResolver(CREATE_CATEGORY_SCHEMA),
  });
  const [createCategory, { isLoading }] =
    categoriesService.useCreateCategoryMutation();

  function onSubmitHandler(data: CreateCategoryDto) {
    createCategory(data)
      .unwrap()
      .then((category) => navigate(Routes.editCategory(category.id)))
      .catch(console.error);
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="create-category-page">
        <PageLayout.Header className="aic">
          <Link to={Routes.categories()} startIcon={<Icon name="back-arrow" />}>
            Список категорій
          </Link>
          <div className="df aic gap30">
            <div className="edit-category-page__switch df aic gap10">
              Опублікувати
              <Switch name="published" />
            </div>
            <LoadingButton
              color="success"
              variant="contained"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<Icon name="save" size="fill" />}
              onClick={form.handleSubmit(onSubmitHandler)}>
              Зберегти
            </LoadingButton>
          </div>
        </PageLayout.Header>
        <PageLayout.Content className="create-category-page__content">
          <div className="create-category-page__type">
            <CategoryTypeRadioGroup />
          </div>
          <ContentBox className="create-category-page__image">
            <ContentBox.Header>
              <ContentBox.Title>Зображення</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content>
              <CategoryImageUploader />
            </ContentBox.Content>
          </ContentBox>
          <ContentBox className="create-category-page__icon">
            <ContentBox.Header>
              <ContentBox.Title>Іконка</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content>
              <CategoryIconUploader />
            </ContentBox.Content>
          </ContentBox>
          <div className="create-category-page__info">
            <CategoryInfo />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default CreateCategory;
