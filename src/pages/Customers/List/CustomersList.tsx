import { FC } from "react";

import { Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import Icon from "@components/ui/Icon";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import FiltersPanel from "@components/shared/FiltersPanel";

import { Routes } from "@router/routes";

import { IPaginatedResult } from "@utils/types/pagination";

import "./CustomersList.scss";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 5,
  total: 0,
  totalPages: 0,
} as IPaginatedResult<any>;

const CustomersList: FC = () => {
  const [searchParams] = useSearchParams();
  /* const { data: categories = DEFAULT_VALUE, isLoading } =
    categoriesService.useGetPaginatedCategoriesQuery(
      Object.fromEntries(searchParams)
    );
  const [deleteCategory] = categoriesService.useDeleteCategoryMutation(); */

  function deleteCustomerHandler(id: number) {
    /* NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити дану категорію?",
    }).then(() => deleteCategory(id)); */
  }

  /* if (isLoading) {
    return <div>Loading...</div>;
  } */

  return (
    <PageLayout className="categories-list-page">
      <PageLayout.Header className="aife">
        <PageLayout.Title badgeContent={0}>
          Список клієнтів
        </PageLayout.Title>
        <Button
          to={Routes.createCustomer()}
          color="success"
          component={Link}
          startIcon={<Icon name="plus" size="fill" />}>
          Створити клієнта
        </Button>
      </PageLayout.Header>
      <PageLayout.Content className="categories-list-page__content">
        <FiltersPanel>
          <FiltersPanel.Filters />
          <FiltersPanel.Search />
        </FiltersPanel>
        <ContentBox>
          {/* <RouterBasedTable
            enableDelete
            data={categories.data}
            columns={TABLE_COLUMNS}
            page={categories.page}
            count={categories.total}
            rowsPerPage={categories.limit}
            onDeleteAction={deleteCategoryHandler}
          /> */}
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default CustomersList;