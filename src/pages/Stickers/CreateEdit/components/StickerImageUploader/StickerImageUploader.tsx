import React, { FC, useState } from "react";

import { useController, useFormContext } from "react-hook-form";

import { stickersService } from "@services/stickers";

import ImageUploader from "@components/shared/ImageUploader";

import "./StickerImageUploader.scss";

interface StickerImageUploaderProps {
  imageUrl?: string;
}

const StickerImageUploader: FC<StickerImageUploaderProps> = ({ imageUrl }) => {
  const { control } = useFormContext();
  const {
    field: { onChange },
    fieldState: { invalid },
  } = useController({
    name: "image",
    control,
    defaultValue: null,
  });

  const [image, setImage] = useState<string>(imageUrl ?? null);
  const [uploadImage, { isLoading }] =
    stickersService.useUploadStickerImageMutation();

  function imageChangeHandler(image: File) {
    setImage(null);
    uploadImage(image)
      .unwrap()
      .then(({ url }) => {
        onChange(url);
        setImage(url);
      })
      .catch(console.error);
  }

  return (
    <ImageUploader
      name="image"
      error={invalid}
      imageUrl={image}
      isLoading={isLoading && !image}
      className="sticker-info__image-uploader"
      onChange={imageChangeHandler}
    />
  );
};

export default StickerImageUploader;
