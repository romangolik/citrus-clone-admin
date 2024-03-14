import React, { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { Link, useSearchParams } from "react-router-dom";

import { ShortProductDto, productsService } from "@services/products";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import FiltersPanel from "@components/shared/FiltersPanel";
import { RouterBasedTable } from "@components/layout/Table";
import CreateProductButton from "./components/CreateProductButton";
import ProductTypeSelector from "./components/ProductTypeSelector";
import ProductCategorySelector from "./components/ProductCategorySelector";

import { Routes } from "@router/routes";

import { TABLE_COLUMNS } from "./data/table-columns"

import { IPaginatedResult } from "@utils/types/pagination";

import "./ProductsList.scss";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 5,
  total: 0,
  totalPages: 0,
} as IPaginatedResult<ShortProductDto>;

const ProductsList: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: products = DEFAULT_VALUE, isLoading } =
    productsService.useGetPaginatedProductsQuery(
      Object.fromEntries(searchParams)
    );
  const [deleteProduct] = productsService.useDeleteProductMutation();

  function deleteProductHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити даний продукт?",
    }).then(() => deleteProduct(id));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout className="products-list-page">
      <PageLayout.Header className="aife">
        <PageLayout.Title badgeContent={products.total}>
          Список продуктів
        </PageLayout.Title>
        <div className="df aic gap20">
          <Button
            to={Routes.productsMedia()}
            color="success"
            variant="outlined"
            component={Link}
            startIcon={<Icon name="photo" size="fill" />}>
            Зображення продуктів
          </Button>
          <CreateProductButton />
        </div>
      </PageLayout.Header>
      <PageLayout.Content className="categories-list-page__content">
        <FiltersPanel>
          <FiltersPanel.Filters>
            <ProductTypeSelector />
            <ProductCategorySelector />
          </FiltersPanel.Filters>
          <FiltersPanel.Search />
        </FiltersPanel>
        <ContentBox>
          <RouterBasedTable
            enableDelete
            data={products.data}
            columns={TABLE_COLUMNS}
            page={products.page}
            count={products.total}
            rowsPerPage={products.limit}
            onDeleteAction={deleteProductHandler}
          />
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default ProductsList;
