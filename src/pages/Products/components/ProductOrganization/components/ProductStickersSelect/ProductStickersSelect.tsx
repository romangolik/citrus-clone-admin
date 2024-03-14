import React, { FC } from "react";

import { IconButton } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { useWatch, useFormContext } from "react-hook-form";

import { StickerDto } from "@services/stickers";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import ProductStickersSelectItem from "./components/ProductStickersSelectItem";

import "./ProductStickersSelect.scss";

const ProductStickersSelect: FC = () => {
  const { control, getValues, setValue } = useFormContext();
  const productStickers: StickerDto[] = useWatch({
    control,
    name: "stickers",
    defaultValue: getValues("stickers")
  });

  function openProductStickersModal() {
    NiceModal.show(Modals.ProductStickersModal, {
      data: getValues("stickers"),
    }).then((data: StickerDto[]) => {
      setValue("stickers", data, { shouldDirty: true });
    });
  }

  function removeProductStickerHandler(id: number) {
    setValue(
      "stickers",
      productStickers.filter((sticker) => sticker.id !== id)
    );
  }

  return (
    <div className="product-stickers-select">
      <h4 className="product-stickers-select__title df aic jcsb regular-weight">
        <span>Стікери</span>
        <IconButton onClick={openProductStickersModal}>
          <Icon name="edit" size="large" />
        </IconButton>
      </h4>
      <div className="product-stickers-select__list df fdc gap10">
        {productStickers.map((sticker) => (
          <ProductStickersSelectItem
            key={sticker.id}
            data={sticker}
            onRemove={removeProductStickerHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductStickersSelect;
