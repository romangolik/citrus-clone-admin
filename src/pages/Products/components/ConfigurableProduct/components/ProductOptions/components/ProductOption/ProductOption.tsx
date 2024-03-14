import { FC, forwardRef, CSSProperties } from "react";

import classNames from "classnames";
import { IconButton } from "@mui/material";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import {
  ProductOptionDto,
  ProductOptionType,
  ProductOptionValueDto,
} from "@services/products";

import Icon from "@components/ui/Icon";
import BulletedText from "@components/ui/BulletedText";
import BaseSortableItem from "@components/shared/BaseSortableItem";

import "./ProductOption.scss";

interface ProductOptionProps {
  index: number;
  data: ProductOptionDto;
  className?: string;
  style?: CSSProperties;
  dragOverlay?: boolean;
  listeners: SyntheticListenerMap;
  onRemove: (index: number) => void;
  onEdit: (index: number, value: ProductOptionDto) => void;
}

const ProductOption = forwardRef<HTMLLIElement, ProductOptionProps>(
  (
    {
      index,
      data,
      style,
      className,
      listeners,
      dragOverlay = false,
      onEdit,
      onRemove,
    },
    ref
  ) => {
    function getOptionVariant(value: ProductOptionValueDto) {
      if (data.type === ProductOptionType.COLOR) {
        return (
          <BulletedText
            key={value.name}
            markColor={value.value}
            markSize={16}
            className="product-option__values-item"
            text={value.name}
          />
        );
      }

      return (
        <span key={value.name} className="product-option__values-item">
          {value.name}
        </span>
      );
    }

    return (
      <BaseSortableItem
        ref={ref}
        style={style}
        listeners={listeners}
        dragOverlay={dragOverlay}
        className={classNames("product-option", className)}>
        <span className="product-option__name h5">{data.name}</span>
        <div className="product-option__values df aic fww">
          {data.values.map(getOptionVariant)}
        </div>
        <div className="product-option__actions df aic mla">
          <IconButton onClick={() => onEdit(index, data)}>
            <Icon name="edit" />
          </IconButton>
          <IconButton onClick={() => onRemove(index)}>
            <Icon name="basket" />
          </IconButton>
        </div>
      </BaseSortableItem>
    );
  }
);

ProductOption.displayName = "ProductOption";

export default ProductOption;
