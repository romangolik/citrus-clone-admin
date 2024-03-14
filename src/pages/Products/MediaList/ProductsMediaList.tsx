import { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { useSearchParams } from "react-router-dom";

import { ProductImageDto, productsService } from "@services/products";

import Icon from "@components/ui/Icon";
import Link from "@components/ui/Link";
import { Modals } from "@components/modals";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import FiltersPanel from "@components/shared/FiltersPanel";
import { RouterBasedTable } from "@components/layout/Table";
import VisuallyHiddenInput from "@components/ui/VisuallyHiddenInput";

import { Routes } from "@router/routes";

import { TABLE_COLUMNS } from "./data/table-columns";

import { IPaginatedResult } from "@utils/types/pagination";
import { SUPPORTED_IMAGE_FORMATS } from "@utils/constants/suported-image-formats";

import "./ProductsMediaList.scss";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 5,
  total: 0,
  totalPages: 0,
} as IPaginatedResult<ProductImageDto>;

const ProductsMediaList: FC = () => {
  const [searchParams] = useSearchParams();
  const [deleteImage] = productsService.useDeleteProductImageMutation();
  const [uploadImages] = productsService.useUploadProductImagesMutation();
  const { data: productImages = DEFAULT_VALUE, isLoading } =
    productsService.useGetProductImagesQuery(Object.fromEntries(searchParams));

  function deleteProductImageHandler(id: number) {
    NiceModal.show(Modals.ConfirmationModal, {
      message: "Чи бажаєте ви видалити дане зображення?",
    }).then(() => deleteImage(id));
  }

  function selectFilesHandler(event: React.ChangeEvent<HTMLInputElement>) {
    uploadImages({
      images: event.target.files,
      used: true,
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout className="products-media-list-page">
      <PageLayout.Header className="aic">
        <Link to={Routes.products()} startIcon={<Icon name="back-arrow" />}>
          Список продуктів
        </Link>
        <Button
          component="label"
          color="success"
          variant="contained"
          startIcon={<Icon name="upload" size="fill" />}>
          Завантажити зображення
          <VisuallyHiddenInput
            type="file"
            multiple
            accept={SUPPORTED_IMAGE_FORMATS.join(", ")}
            onChange={selectFilesHandler}
          />
        </Button>
      </PageLayout.Header>
      <PageLayout.Content className="products-media-list-page__content">
        <FiltersPanel>
          <FiltersPanel.Search />
        </FiltersPanel>
        <ContentBox>
          <RouterBasedTable
            enableDelete
            page={productImages.page}
            count={productImages.total}
            rowsPerPage={productImages.limit}
            className="products-media-table"
            data={productImages.data}
            columns={TABLE_COLUMNS}
            onDeleteAction={deleteProductImageHandler}
          />
        </ContentBox>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default ProductsMediaList;
