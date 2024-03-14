import React, { FC } from "react";

import classNames from "classnames";

import { ShortProductImageDto } from "@services/products";

import "./ImageItem.scss";

interface ImageItemProps {
  data?: ShortProductImageDto;
  selected?: boolean;
  onClick?: (value: ShortProductImageDto) => void;
}

const ImageItem: FC<ImageItemProps> = ({ data, selected = false, onClick }) => {
  function clickHandler() {
    if (onClick) {
      onClick(data);
    }
  }

  return (
    <div
      className={classNames("image-item cup", {
        "image-item_selected": selected,
      })}
      onClick={clickHandler}>
      {data && <img className="image-item__image" src={data.src} alt="" />}
    </div>
  );
};

export default ImageItem;
