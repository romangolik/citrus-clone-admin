import { FC, useState } from "react";

import { Button, IconButton } from "@mui/material";

import { ShortProductImageDto } from "@services/products";

import Icon from "@components/ui/Icon";
import Modal from "@components/ui/Modal";
import ImageItem from "./components/ImageItem";

import "./BaseProductImagesSelectModal.scss";

interface BaseProductImagesSelectModalProps {
  open: boolean;
  page: number;
  title: string;
  totalPages: number;
  isDataLoading?: boolean;
  images: ShortProductImageDto[];
  onClose: () => void;
  onSubmit: (selectedImages: ShortProductImageDto[]) => void;
  onPageChange: (newPage: number) => void;
}

const BaseProductImagesSelectModal: FC<BaseProductImagesSelectModalProps> = ({
  open,
  page,
  title,
  images,
  totalPages,
  isDataLoading = false,
  onClose,
  onSubmit,
  onPageChange,
}) => {
  const [selectedImages, setSelectedImages] = useState<ShortProductImageDto[]>(
    []
  );

  const isDisabledPrevButton = page === 1;
  const isDisabledNextButton = page === totalPages;

  function confirmHandler() {
    onSubmit(selectedImages);
    setSelectedImages([]);
  }

  function closeHandler() {
    setSelectedImages([]);
    onClose();
  }

  function isImageSelected(image: ShortProductImageDto) {
    return !!selectedImages.find((item) => item.id === image.id);
  }

  function prevPage() {
    onPageChange(page - 1);
  }

  function nextPage() {
    onPageChange(page + 1);
  }

  function toogleSelectImage(image: ShortProductImageDto) {
    setSelectedImages((prevSelectedImages) => {
      const alreadySelected = isImageSelected(image);

      if (alreadySelected) {
        return prevSelectedImages.filter((item) => item.id !== image.id);
      } else {
        return [...prevSelectedImages, image];
      }
    });
  }

  return (
    <Modal
      open={open}
      className="base-product-images-select-modal"
      title={title}
      onClose={closeHandler}>
      <ul className="base-product-images-select-modal__list">
        {isDataLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className="base-product-images-select-modal__list-item">
                <ImageItem />
              </li>
            ))}
        {images.map((image) => (
          <li
            key={image.id}
            className="base-product-images-select-modal__list-item">
            <ImageItem
              data={image}
              selected={isImageSelected(image)}
              onClick={toogleSelectImage}
            />
          </li>
        ))}
      </ul>
      <Modal.Actions className="base-product-images-select-modal__actions">
        <div className="df aic gap10">
          <IconButton disabled={isDisabledPrevButton} onClick={prevPage}>
            <Icon name="arrow-left" />
          </IconButton>
          <IconButton disabled={isDisabledNextButton} onClick={nextPage}>
            <Icon name="arrow-right" />
          </IconButton>
        </div>
        <div className="df aic gap20">
          <Button
            variant="outlined"
            color="success"
            className="insert-image-modal__action-button"
            onClick={closeHandler}>
            Скасувати
          </Button>
          <Button
            color="success"
            className="insert-image-modal__action-button"
            disabled={selectedImages.length === 0}
            onClick={confirmHandler}>
            Вставити
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default BaseProductImagesSelectModal;
