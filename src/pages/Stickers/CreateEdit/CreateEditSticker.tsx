import React, { FC, useEffect } from "react";

import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

import {
  stickersService,
  CreateStickerDto,
  UpdateStickerDto,
} from "@services/stickers";

import Icon from "@components/ui/Icon";
import Link from "@components/ui/Link";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import TextFormField from "@components/ui/TextFormField";
import StickerImageUploader from "./components/StickerImageUploader";

import { Routes } from "@router/routes";

import { STICKER_SCHEMA } from "@utils/validation-schemas/sticker.chema";

import "./CreateEditSticker.scss";

const CREATE_FORM_STATE = {
  title: "",
  description: "",
  image: null,
} as CreateStickerDto;

const CreateEditSticker: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isCreateMode = !id;

  const form = useForm({
    mode: "onChange",
    defaultValues: CREATE_FORM_STATE,
    resolver: yupResolver(STICKER_SCHEMA),
  });

  const { data: sticker, isLoading } = stickersService.useGetStickerQuery(+id, {
    skip: isCreateMode,
  });
  const [createSticker, { isLoading: isCreating }] =
    stickersService.useCreateStickerMutation();
  const [updateSticker, { isLoading: isUpdating }] =
    stickersService.useUpdateStickerMutation();

  async function createStickerHandler(data: CreateStickerDto) {
    createSticker(data)
      .unwrap()
      .then((sticker) => navigate(Routes.editSticker(sticker.id)))
      .catch(console.error);
  }

  async function updateStickerHandler(data: UpdateStickerDto) {
    updateSticker(data).unwrap().catch(console.error);
  }

  useEffect(() => {
    if (sticker) {
      form.reset(sticker);
    }
  }, [sticker]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="create-edit-sticker-page">
        <PageLayout.Header className="aic">
          <Link to={Routes.stickers()} startIcon={<Icon name="back-arrow" />}>
            Список стікерів
          </Link>
          <LoadingButton
            color="success"
            variant="contained"
            loading={isCreating || isUpdating}
            loadingPosition="start"
            startIcon={<Icon name="save" size="fill" />}
            onClick={form.handleSubmit(
              isCreateMode ? createStickerHandler : updateStickerHandler
            )}>
            Зберегти
          </LoadingButton>
        </PageLayout.Header>
        <PageLayout.Content className="create-edit-sticker-page__content">
          <ContentBox className="sticker-info">
            <ContentBox.Header>
              <ContentBox.Title>Інформація про стікер</ContentBox.Title>
            </ContentBox.Header>
            <ContentBox.Content className="sticker-info__content df gap30">
              <StickerImageUploader imageUrl={sticker?.image} />
              <div className="sticker-info__fields grid-gap15">
                <TextFormField name="title" label="Назва" required fullWidth />
                <TextFormField
                  name="description"
                  label="Опис"
                  required
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>
            </ContentBox.Content>
          </ContentBox>
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default CreateEditSticker;
