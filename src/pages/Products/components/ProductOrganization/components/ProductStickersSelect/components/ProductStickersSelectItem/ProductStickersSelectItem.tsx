import React, { FC } from "react";

import { IconButton } from "@mui/material";

import { StickerDto } from "@services/stickers";

import Icon from "@components/ui/Icon";

import "./ProductStickerSelectItem.scss";

interface ProductStickersSelectItemProps {
  data: StickerDto;
  onRemove: (id: number) => void
}

const ProductStickersSelectItem: FC<ProductStickersSelectItemProps> = ({
  data,
  onRemove,
}) => {
  return (
    <div className="product-stickers-select-item df aic gap10">
      <img
        src={data.image}
        alt={data.title}
        className="product-stickers-select-item__image"
      />
      <p>{data.title}</p>
      <IconButton
        className="product-stickers-select-item__button"
        onClick={() => onRemove(data.id)}>
        <Icon name="basket" />
      </IconButton>
    </div>
  );
};

export default ProductStickersSelectItem;
