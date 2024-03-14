import { FC, CSSProperties } from "react";

import { rectSortingStrategy } from "@dnd-kit/sortable";

import { ShortProductImageDto } from "@services/products";

import SortableList from "@components/shared/SortableList";
import ProductImageItem from "./components/ProductImageItem";

import "./ImagesList.scss";

interface ImagesListProps {
  sortable?: boolean;
  columns?: number;
  images: ShortProductImageDto[];
  emptyListProps?: {
    title: string;
    helperText?: string;
  };
  onRemove?: (id: number) => void;
  onOrderChange?: (value: ShortProductImageDto[]) => void;
}

const ImagesList: FC<ImagesListProps> = ({
  images,
  emptyListProps,
  columns = 5,
  sortable = false,
  onRemove,
  onOrderChange,
}) => {
  function changeOrderHandler(newArray: ShortProductImageDto[]) {
    if (sortable && onOrderChange) {
      onOrderChange(newArray);
    }
  }

  return (
    <SortableList
      handle
      vertical
      scrollable
      adjustScale
      items={images}
      sortField="id"
      className={"images-list grid-gap20"}
      style={{
        "--images-column-count": columns,
      } as CSSProperties}
      emptyListProps={emptyListProps}
      onChange={changeOrderHandler}
      strategy={rectSortingStrategy}
      renderItem={({ ref, value, listeners }) => {
        if (sortable) {
          return (
            <ProductImageItem
              ref={ref as React.Ref<HTMLDivElement>}
              data={value}
              listeners={listeners}
              onRemove={onRemove}
            />
          );
        }

        return <ProductImageItem data={value} onRemove={onRemove} />;
      }}
    />
  );
};

export default ImagesList;
