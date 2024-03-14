import React, { FC } from "react";

import classNames from "classnames";
import { CircularProgress } from "@mui/material";

import Icon from "@components/ui/Icon";

import { SUPPORTED_IMAGE_FORMATS } from "@utils/constants/suported-image-formats";

import "./ImageUploader.scss";

interface ImageUploaderProps {
  name: string;
  error?: boolean;
  imageUrl?: string;
  className?: string;
  isLoading?: boolean;
  variant?: "square" | "rounded";
  bgcolor?: React.CSSProperties["backgroundColor"];
  placeholderIcon?: React.ReactElement;
  onChange?: (file: File) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  name,
  imageUrl,
  className,
  placeholderIcon,
  error = false,
  isLoading = false,
  bgcolor = "white",
  variant = "square",
  onChange: onChange,
}) => {
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];

    if (file && onChange) {
      onChange(file);
    }
  }

  function getUploaderContent(): React.ReactElement {
    if (isLoading) {
      return <CircularProgress className="image-uploader__loader" />;
    }

    if (imageUrl) {
      return (
        <img
          alt="Uploaded image"
          src={imageUrl}
          className="image-uploader__image"
        />
      );
    }

    if (placeholderIcon) {
      return placeholderIcon;
    }

    return <Icon className="image-uploader__add-icon" name="plus-circle" />;
  }

  return (
    <div
      className={classNames("image-uploader df aic jcc", className, {
        "image-uploader_error": error,
        "image-uploader_square": variant === "square",
        "image-uploader_rounded": variant === "rounded",
      })}
      style={{
        backgroundColor: bgcolor,
      }}>
      {getUploaderContent()}
      {!isLoading && (
        <div className="image-uploader__overlay df aic jcc">
          <input
            type="file"
            name={name}
            accept={SUPPORTED_IMAGE_FORMATS.join(", ")}
            onChange={onChangeHandler}
          />
          <Icon className="image-uploader__add-icon" name="plus-circle" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
