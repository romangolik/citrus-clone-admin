import React, { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { Link, useSearchParams } from "react-router-dom";

import { ShortCategoryDto, categoriesService } from "@services/categories";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import FiltersPanel from "@components/shared/FiltersPanel";
import { RouterBasedTable } from "@components/layout/Table";
import CategoryTypeSelector from "./components/CategoryTypeSelector";

import { Routes } from "@router/routes";

import { TABLE_COLUMNS } from "./data/table-columns";

import { IPaginatedResult } from "@utils/types/pagination";

import "./CategoriesList.scss";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 5,
  total: 0,
  totalPages: 0,
} as IPaginatedResult<ShortCategoryDto>;

const CategoriesList: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: categories = DEFAULT_VALUE, isLoading } =
    categoriesService.useGetPaginatedCategoriesQuery(
      Object.fromEntries(searchParams)
    );
  const [deleteCategory] = categoriesService.useDeleteCategoryMutation();

  function deleteCategoryHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити дану категорію?",
    }).then(() => deleteCategory(id));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout className="categories-list-page">
      <PageLayout.Header className="aife">
        <PageLayout.Title badgeContent={categories.total}>
          Список категорий
        </PageLayout.Title>
        <Button
          to={Routes.createCategory()}
          color="success"
          component={Link}
          startIcon={<Icon name="plus" size="fill" />}>
          Створити категорію
        </Button>
      </PageLayout.Header>
      <PageLayout.Content className="categories-list-page__content">
        <FiltersPanel>
          <FiltersPanel.Filters>
            <CategoryTypeSelector />
          </FiltersPanel.Filters>
          <FiltersPanel.Search />
        </FiltersPanel>
        <ContentBox>
          <RouterBasedTable
            enableDelete
            data={categories.data}
            columns={TABLE_COLUMNS}
            page={categories.page}
            count={categories.total}
            rowsPerPage={categories.limit}
            onDeleteAction={deleteCategoryHandler}
          />
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default CategoriesList;
