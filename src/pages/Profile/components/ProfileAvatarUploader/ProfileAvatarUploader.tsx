import React, { FC, useState } from "react";

import { useController, useFormContext } from "react-hook-form";

import { usersService } from "@services/users";

import Icon from "@components/ui/Icon";
import ImageUploader from "@components/shared/ImageUploader";

import "./ProfileAvatarUploader.scss";

interface ProfileAvatarUploaderProps {
  imageUrl?: string;
}

const ProfileAvatarUploader: FC<ProfileAvatarUploaderProps> = ({ imageUrl }) => {
  const { control } = useFormContext();
  const {
    field: { onChange },
    fieldState: { invalid },
  } = useController({
    name: "avatar",
    control,
    defaultValue: null,
  });

  const [image, setImage] = useState<string>(imageUrl ?? null);
  const [uploadAvatar, { isLoading }] =
    usersService.useUploadProfileAvatarMutation();

  function imageChangeHandler(image: File) {
    setImage(null);
    uploadAvatar(image)
      .unwrap()
      .then(({ url }) => {
        onChange(url);
        setImage(url);
      })
      .catch(console.error);
  }

  return (
    <ImageUploader
      name="avatar"
      variant="rounded"
      bgcolor="#bdbdbd"
      className="profile-info__image-uploader"
      placeholderIcon={
        <Icon name="person" className="profile-info__placeholder-icon" />
      }
      error={invalid}
      imageUrl={image}
      isLoading={isLoading && !image}
      onChange={imageChangeHandler}
    />
  );
};

export default ProfileAvatarUploader;
