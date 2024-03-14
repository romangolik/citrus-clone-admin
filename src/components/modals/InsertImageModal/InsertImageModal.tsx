import { useState } from "react";

import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { productsService, ShortProductImageDto } from "@services/products";

import BaseProductImagesSelectModal from "../BaseProductImagesSelectModal";

import { IPaginatedResult } from "@utils/types/pagination";

const DEFAULT_VALUE = {
  data: [],
  page: 1,
  limit: 8,
  total: 0,
  totalPages: 1,
} as IPaginatedResult<ShortProductImageDto>;

export default NiceModal.create(() => {
  const modal = useModal();
  const [page, setPage] = useState(1);
  const { data: productImages = DEFAULT_VALUE, isLoading } =
    productsService.useGetProductImagesQuery({
      page,
      limit: 8,
    });

  function confirmHandler(selectedImages: ShortProductImageDto[]) {
    modal.resolve(selectedImages);
    modal.hide();
  }

  function closeHandler() {
    modal.resolve([]);
    modal.hide();
  }

  return (
    <BaseProductImagesSelectModal
      open={modal.visible}
      page={page}
      title="Вставити зображення"
      totalPages={productImages.totalPages}
      isDataLoading={isLoading}
      images={productImages.data}
      onClose={closeHandler}
      onSubmit={confirmHandler}
      onPageChange={setPage}
    />
  );
});
