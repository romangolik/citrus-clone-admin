import React, { FC } from "react";

import { Button } from "@mui/material";
import { useWatch, useFormContext } from "react-hook-form";

import { productsService, ShortProductImageDto } from "@services/products";

import Icon from "@components/ui/Icon";
import ContentBox from "@components/ui/ContentBox";
import VisuallyHiddenInput from "@components/ui/VisuallyHiddenInput";

import ImagesList from "../ImagesList";

import { SUPPORTED_IMAGE_FORMATS } from "@utils/constants/suported-image-formats";

interface ProductImagesProps {
  onRemove?: (id: number) => void;
}

const ProductImages: FC<ProductImagesProps> = ({ onRemove }) => {
  const { control, setValue } = useFormContext();
  const [uploadImages] = productsService.useUploadProductImagesMutation();

  const items = useWatch({
    control,
    name: "images",
  }) as ShortProductImageDto[];

  function updateProductImages(newData: ShortProductImageDto[]) {
    setValue("images", newData, { shouldDirty: true });
  }

  function uploadImagesHandler(event: React.ChangeEvent<HTMLInputElement>) {
    uploadImages({
      images: event.target.files,
      used: false,
    })
      .unwrap()
      .then((data) => updateProductImages([...items, ...data]))
      .catch(console.error);
  }

  function removeProductImageHandler(id: number) {
    updateProductImages(items.filter((productImage) => productImage.id !== id));
    if (onRemove) {
      onRemove(id);
    }
  }

  return (
    <ContentBox className="product-images">
      <ContentBox.Header>
        <ContentBox.Title>Зображення</ContentBox.Title>
        <Button
          component="label"
          color="success"
          variant="contained"
          size="small"
          startIcon={<Icon name="upload" size="fill" />}>
          Завантажити
          <VisuallyHiddenInput
            type="file"
            multiple
            accept={SUPPORTED_IMAGE_FORMATS.join(", ")}
            onChange={uploadImagesHandler}
          />
        </Button>
      </ContentBox.Header>
      <ContentBox.Content>
        <ImagesList
          sortable
          images={items}
          emptyListProps={{
            title: "Список зображень порожній",
            helperText: "Продукт поивнен мати щонайменше 1 зображення",
          }}
          onRemove={removeProductImageHandler}
          onOrderChange={updateProductImages}
        />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductImages;
