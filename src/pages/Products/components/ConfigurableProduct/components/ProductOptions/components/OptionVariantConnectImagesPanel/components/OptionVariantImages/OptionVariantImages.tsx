import { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";

import {
  ShortProductImageDto,
  ProductOptionValueDto,
} from "@services/products";

import ImagesList from "@pages/Products/components/ImagesList";

import { Modals } from "@components/modals";

import "./OptionVariantImages.scss";

interface OptionVariantImagesProps {
  data: ProductOptionValueDto;
  productImages: ShortProductImageDto[];
  onChange: (value: number[]) => void;
}

const OptionVariantImages: FC<OptionVariantImagesProps> = ({
  data,
  productImages,
  onChange,
}) => {
  const optionValueImages: ShortProductImageDto[] = [];
  const diff: ShortProductImageDto[] = [];

  productImages.forEach((productImage) => {
    if (data.images.includes(productImage.id)) {
      optionValueImages.push(productImage);
    } else {
      diff.push(productImage);
    }
  });

  function openSelectImageModal() {
    NiceModal.show(Modals.ProductImagesSelectModal, {
      data: diff,
    }).then((result: ShortProductImageDto[]) => {
      if (result) {
        onChange(data.images.concat(...result.map((item) => item.id)));
      }
    });
  }

  function removeImage(id: number) {
    onChange(data.images.filter((imageId) => imageId !== id));
  }

  return (
    <div className="option-variant-images">
      <header className="option-variant-images__header df aic jcsb">
        <h4>Зображення варіанта: {data.name}</h4>
        {diff.length > 0 && (
          <Button size="small" color="success" onClick={openSelectImageModal}>
            Обрати
          </Button>
        )}
      </header>
      <ImagesList
        columns={6}
        images={optionValueImages}
        onRemove={removeImage}
      />
    </div>
  );
};

export default OptionVariantImages;
