import React, { FC, useState } from "react";

import { useController, useFormContext } from "react-hook-form";

import { categoriesService } from "@services/categories";

import ImageUploader from "@components/shared/ImageUploader";

import "./CategoryImageUploader.scss";

interface CategoryImageUploaderProps {
  imageUrl?: string;
}

const CategoryImageUploader: FC<CategoryImageUploaderProps> = ({
  imageUrl,
}) => {
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
    categoriesService.useUploadCategoryImageMutation();

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
      onChange={imageChangeHandler}
    />
  );
};

export default CategoryImageUploader;
