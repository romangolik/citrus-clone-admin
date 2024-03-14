import React, { FC, useState } from "react";

import { useController, useFormContext } from "react-hook-form";

import { categoriesService } from "@services/categories";

import ImageUploader from "@components/shared/ImageUploader";

import "./CategoryIconUploader.scss";

interface CategoryIconUploaderProps {
  iconUrl?: string;
}

const CategoryIconUploader: FC<CategoryIconUploaderProps> = ({ iconUrl }) => {
  const { control } = useFormContext();
  const {
    field: { onChange },
    fieldState: { invalid },
  } = useController({
    name: "icon",
    control,
    defaultValue: null,
  });

  const [icon, setIcon] = useState<string>(iconUrl ?? null);
  const [uploadIcon, { isLoading }] =
    categoriesService.useUploadCategoryIconMutation();

  function iconChangeHandler(icon: File) {
    setIcon(null);
    uploadIcon(icon)
      .unwrap()
      .then(({ url }) => {
        onChange(url);
        setIcon(url);
      })
      .catch(console.error);
  }

  return (
    <ImageUploader
      name="icon"
      error={invalid}
      imageUrl={icon}
      isLoading={isLoading && !icon}
      onChange={iconChangeHandler}
    />
  );
};

export default CategoryIconUploader;