import { forwardRef } from "react";

import classNames from "classnames";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

import { ShortProductImageDto } from "@services/products";

import Icon from "@components/ui/Icon";

import "./ProductImageItem.scss";

interface ProductImageProps {
  data: ShortProductImageDto;
  style?: React.CSSProperties;
  className?: string;
  listeners?: DraggableSyntheticListeners;
  onRemove?: (id: number) => void;
}

const ProductImageItem = forwardRef<HTMLDivElement, ProductImageProps>(
  ({ data, style, listeners, className, onRemove }, ref) => {
    const isFunctionalityEnable = !!(listeners || onRemove);

    return (
      <div
        ref={ref}
        style={style}
        className={classNames("product-image-item", !!className && className)}>
        <img className="product-image-item__image" src={data.src} alt="" />
        {isFunctionalityEnable && (
          <div className="product-image-item__functionality df aic jcc">
            {listeners && (
              <button
                className="product-image-item__drag-handle sortable-list-item__drag-handle"
                {...listeners}>
                <Icon name="drag-handle-secondary" size="fill" />
              </button>
            )}
            {onRemove && (
              <button
                className="product-image-item__delete-button"
                onClick={() => onRemove(data.id)}>
                <Icon name="basket" size="fill" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

ProductImageItem.displayName = "ProductImageItem";

export default ProductImageItem;
