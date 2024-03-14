import { useState } from "react";

import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { ShortProductImageDto } from "@services/products";

import BaseProductImagesSelectModal from "../BaseProductImagesSelectModal";

interface ProductImagesSelectModalProps {
  data: ShortProductImageDto[];
}

const LIMIT = 8;

export default NiceModal.create(({ data }: ProductImagesSelectModalProps) => {
  const modal = useModal();
  const [page, setPage] = useState(1);
  const skip = (page - 1) * LIMIT || 0;
  const totalPages = Math.ceil(data.length / LIMIT);
  const paginatedData = data.slice(skip, page * LIMIT);

  function confirmHandler(selectedImages: ShortProductImageDto[]) {
    modal.resolve(selectedImages);
    modal.hide();
  }

  function closeHandler() {
    modal.hide();
  }

  return (
    <BaseProductImagesSelectModal
      open={modal.visible}
      page={page}
      title="Обрати зображення"
      totalPages={totalPages}
      images={paginatedData}
      onClose={closeHandler}
      onSubmit={confirmHandler}
      onPageChange={setPage}
    />
  );
});
