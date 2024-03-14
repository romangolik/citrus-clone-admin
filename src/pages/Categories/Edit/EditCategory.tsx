import React, { FC, useEffect } from "react";

import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useParams, Link as RouterLink } from "react-router-dom";

import {
  CategoryDto,
  CategoryType,
  categoriesService,
} from "@services/categories";

import Link from "@components/ui/Link";
import Icon from "@components/ui/Icon";
import Switch from "@components/ui/Switch";
import ContentBox from "@components/ui/ContentBox";
import CategoryInfo from "../components/CategoryInfo";
import PageLayout from "@components/layout/PageLayout";
import CategoryIconUploader from "../components/CategoryIconUploader";
import CategoryImageUploader from "../components/CategoryImageUploader";

import { Routes } from "@router/routes";

import { EDIT_CATEGORY_SCHEMA } from "@utils/validation-schemas/category.schemas";

import "./EditCategory.scss";

const DEFAULT_STATE: Omit<CategoryDto, "id" | "type"> = {
  name: "",
  slug: "",
  published: false,
  icon: null,
  image: null,
  parentId: null,
};

const EditCategory: FC = () => {
  const { id } = useParams();
  const { data: category, isLoading } =
    categoriesService.useGetCategoryQuery(+id);
  const [updateCategory, { isLoading: isSaving }] =
    categoriesService.useUpdateCategoryMutation();

  const form = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_STATE,
    resolver: yupResolver(EDIT_CATEGORY_SCHEMA),
  });

  useEffect(() => {
    if (category) {
      form.reset(category);
    }
  }, [category, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="edit-category-page">
        <PageLayout.Header className="aic">
          <Link to={Routes.categories()} startIcon={<Icon name="back-arrow" />}>
            Список категорій
          </Link>
          <div className="df aic gap30">
            <div className="edit-category-page__switch df aic gap10">
              Опублікувати
              <Switch name="published" />
            </div>
            {category.type === CategoryType.PRODUCTS && (
              <Button
                to={Routes.categoryManageAttributes(+id)}
                color="success"
                variant="outlined"
                component={RouterLink}>
                Управління атрибутами
              </Button>
            )}
            <LoadingButton
              color="success"
              variant="contained"
              loading={isSaving}
              loadingPosition="start"
              startIcon={<Icon name="save" size="fill" />}
              onClick={form.handleSubmit(updateCategory)}>
              Зберегти
            </LoadingButton>
          </div>
        </PageLayout.Header>
        <PageLayout.Content className="edit-category-page__content">
          <ContentBox className="edit-category-page__image">
            <ContentBox.Header>
              <ContentBox.Title>Зображення</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content>
              <CategoryImageUploader imageUrl={category.image} />
            </ContentBox.Content>
          </ContentBox>
          <ContentBox className="edit-category-page__icon">
            <ContentBox.Header>
              <ContentBox.Title>Іконка</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content>
              <CategoryIconUploader iconUrl={category?.icon} />
            </ContentBox.Content>
          </ContentBox>
          <div className="edit-category-page__info">
            <CategoryInfo categoryId={category.id} />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default EditCategory;
