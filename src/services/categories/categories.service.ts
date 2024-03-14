import { baseService, CATEGORIES_TAG } from "@services/base";

import { CategoryDto } from "./dtos/category.dto";
import { CategoryType } from "./data/category-type.enum";
import { ShortCategoryDto } from "./dtos/short-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { CreateCategoryDto } from "./dtos/create-category.dto";

import { IPaginatedResult } from "@utils/types/pagination";
import { fileToFormData } from "@utils/helpers/fileToFormData";
import { ImageUploadResult } from "@utils/types/image-upload-result";
import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

const CATEGORIES_ENDPOINT_PREFIX = "/categories";

//TODO: додати тип для кверіпараметрів
export const categoriesService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query<CategoryDto[], void | Record<string, any>>(
      {
        query: (params) => ({
          url: CATEGORIES_ENDPOINT_PREFIX,
          params: params ? params : {},
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: CATEGORIES_TAG, id })),
                { type: CATEGORIES_TAG, id: "ALL" },
              ]
            : [{ type: CATEGORIES_TAG, id: "ALL" }],
      }
    ),
    getPaginatedCategories: build.query<
      IPaginatedResult<ShortCategoryDto>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `${CATEGORIES_ENDPOINT_PREFIX}/paginated`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: CATEGORIES_TAG, id })),
              { type: CATEGORIES_TAG, id: "ALL" },
            ]
          : [{ type: CATEGORIES_TAG, id: "ALL" }],
    }),
    getCategory: build.query<CategoryDto, number>({
      query: (id) => `${CATEGORIES_ENDPOINT_PREFIX}/${id}`,
      providesTags: (result) =>
        result ? [{ type: CATEGORIES_TAG, id: result.id }] : [],
    }),
    uploadCategoryImage: build.mutation<ImageUploadResult, File>({
      query: (image) => ({
        url: `${CATEGORIES_ENDPOINT_PREFIX}/upload-image`,
        method: "POST",
        body: fileToFormData(image, "image"),
      }),
    }),
    uploadCategoryIcon: build.mutation<ImageUploadResult, File>({
      query: (icon) => ({
        url: `${CATEGORIES_ENDPOINT_PREFIX}/upload-icon`,
        method: "POST",
        body: fileToFormData(icon, "icon"),
      }),
    }),
    createCategory: build.mutation<CategoryDto, CreateCategoryDto>({
      query: (body) => ({
        url: CATEGORIES_ENDPOINT_PREFIX,
        method: "POST",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Категорія успішно створена"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: CATEGORIES_TAG, id: "ALL" }],
    }),
    updateCategory: build.mutation<CategoryDto, UpdateCategoryDto>({
      query: ({ id, ...body }) => ({
        url: `${CATEGORIES_ENDPOINT_PREFIX}/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification(
        "Дані категорії успішно оновлено"
      ),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: CATEGORIES_TAG, id: arg.id }],
    }),
    deleteCategory: build.mutation<CategoryDto, number>({
      query: (id) => ({
        url: `${CATEGORIES_ENDPOINT_PREFIX}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification(
        "Категорія була успішно видалена"
      ),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: CATEGORIES_TAG, id: "ALL" }],
    }),
  }),
});
