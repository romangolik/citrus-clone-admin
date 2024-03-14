import { baseService, STICKERS_TAG } from "@services/base";

import { StickerDto } from "./dtos/sticker.dto";
import { CreateStickerDto } from "./dtos/create-sticker.dto";
import { UpdateStickerDto } from "./dtos/update-sticker.dto";

import { IPaginatedResult } from "@utils/types/pagination";
import { fileToFormData } from "@utils/helpers/fileToFormData";
import { ImageUploadResult } from "@utils/types/image-upload-result";
import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

const STICKERS_ENDPOINT_PREFIX = "/stickers";

export const stickersService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getAllStickers: build.query<StickerDto[], void>({
      query: () => STICKERS_ENDPOINT_PREFIX,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: STICKERS_TAG, id })),
              { type: STICKERS_TAG, id: "ALL" },
            ]
          : [{ type: STICKERS_TAG, id: "ALL" }],
    }),
    getPaginatedStickers: build.query<
      IPaginatedResult<StickerDto>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `${STICKERS_ENDPOINT_PREFIX}/paginated`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: STICKERS_TAG, id })),
              { type: STICKERS_TAG, id: "ALL" },
            ]
          : [{ type: STICKERS_TAG, id: "ALL" }],
    }),
    getSticker: build.query<StickerDto, number>({
      query: (id) => `${STICKERS_ENDPOINT_PREFIX}/${id}`,
      providesTags: (result) =>
        result ? [{ type: STICKERS_TAG, id: result.id }] : [],
    }),
    uploadStickerImage: build.mutation<ImageUploadResult, File>({
      query: (image) => ({
        url: `${STICKERS_ENDPOINT_PREFIX}/upload-image`,
        method: "POST",
        body: fileToFormData(image, "image"),
      }),
    }),
    createSticker: build.mutation<StickerDto, CreateStickerDto>({
      query: (body) => ({
        url: STICKERS_ENDPOINT_PREFIX,
        method: "POST",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Стікер успішно створено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: STICKERS_TAG, id: "ALL" }],
    }),
    updateSticker: build.mutation<StickerDto, UpdateStickerDto>({
      query: ({ id, ...body }) => ({
        url: `${STICKERS_ENDPOINT_PREFIX}/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification(
        "Дані стікера було успішно оновлено"
      ),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: STICKERS_TAG, id: arg.id }],
    }),
    deleteSticker: build.mutation<StickerDto, number>({
      query: (id) => ({
        url: `${STICKERS_ENDPOINT_PREFIX}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification("Стікер був успішно видалений"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: STICKERS_TAG, id: "ALL" }],
    }),
  }),
});
