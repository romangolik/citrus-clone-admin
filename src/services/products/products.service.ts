import { baseService, PRODUCTS_TAG, PRODUCT_IMAGES_TAG } from "@services/base";

import { ProductDto } from "./dtos/product.dto";
import { ProductImageDto } from "./dtos/product-image.dto";
import { ShortProductDto } from "./dtos/short-product.dto";
import { ShortProductImageDto } from "./dtos/short-product-image.dto";
import { UploadProductImageDto } from "./dtos/upload-product-image.dto";

import { IPaginatedResult } from "@utils/types/pagination";
import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

const PRODUCTS_ENDPOINT_PREFIX = "/products";

export const productsService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getProductImages: build.query<
      IPaginatedResult<ProductImageDto>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `${PRODUCTS_ENDPOINT_PREFIX}/images`,
        params,
      }),
      providesTags: [PRODUCT_IMAGES_TAG],
    }),
    uploadProductImages: build.mutation<
      ShortProductImageDto[],
      UploadProductImageDto
    >({
      query: ({ images, used }) => {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }

        return {
          url: `${PRODUCTS_ENDPOINT_PREFIX}/upload-images`,
          method: "POST",
          body: formData,
          params: {
            used,
          },
        };
      },
      onQueryStarted: httpSuccessNotification("Зображення успішно завантажено"),
      invalidatesTags: [PRODUCT_IMAGES_TAG],
    }),
    deleteProductImage: build.mutation<ProductImageDto, number>({
      query: (id) => ({
        url: `${PRODUCTS_ENDPOINT_PREFIX}/images/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification("Зображення успішно видалено"),
      invalidatesTags: (result, error) => (error ? [] : [PRODUCT_IMAGES_TAG]),
    }),
    getPaginatedProducts: build.query<
      IPaginatedResult<ShortProductDto>,
      Record<string, any>
    >({
      query: (params) => ({
        url: `${PRODUCTS_ENDPOINT_PREFIX}/paginated`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: PRODUCTS_TAG, id })),
              { type: PRODUCTS_TAG, id: "ALL" },
            ]
          : [{ type: PRODUCTS_TAG, id: "ALL" }],
    }),
    getProduct: build.query<ProductDto, number>({
      query: (id) => `${PRODUCTS_ENDPOINT_PREFIX}/${id}`,
    }),
    createProduct: build.mutation<ProductDto, ProductDto>({
      query: (body) => ({
        url: PRODUCTS_ENDPOINT_PREFIX,
        method: "POST",
        body: {
          ...body,
          stickers: body.stickers.map((sticker) => sticker.id),
          images: body.images.map((image) => image.id),
        },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: PRODUCTS_TAG, id: "ALL" }],
      onQueryStarted: httpSuccessNotification("Продукт успішно створено"),
    }),
    updateProduct: build.mutation<ProductDto, ProductDto>({
      query: ({ id, ...body }) => ({
        url: `${PRODUCTS_ENDPOINT_PREFIX}/${id}`,
        method: "PUT",
        body: {
          ...body,
          stickers: body.stickers.map((sticker) => sticker.id),
          images: body.images.map((image) => image.id),
        },
      }),
      onQueryStarted: httpSuccessNotification(
        "Дані продукта успішно оновлено"
      ),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: PRODUCTS_TAG, id: arg.id }],
    }),
    deleteProduct: build.mutation<ProductDto, number>({
      query: (id) => ({
        url: `${PRODUCTS_ENDPOINT_PREFIX}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification(
        "Продукт було успішно видалено"
      ),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: PRODUCTS_TAG, id: "ALL" }],
    }),
    /* getAllAttributesByCategory: build.query<AttributeDto[], number>({
      query: (categoryId) =>
        `${ATTRIBUTE_ENDPOINT_PREFIX}/category/${categoryId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: ATTRIBUTES_TAG,
                id,
              })),
              { type: ATTRIBUTES_TAG, id: "ALL" },
            ]
          : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }),
    createAttribute: build.mutation<AttributeDto, CreateAttributeDto>({
      query: (body) => ({
        url: ATTRIBUTE_ENDPOINT_PREFIX,
        method: "POST",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно створено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }),
    updateAttributesOrder: build.mutation<AttributeDto[], AttributeDto[]>({
      query: (attributes) => ({
        url: `${ATTRIBUTE_ENDPOINT_PREFIX}/update-order`,
        method: "PUT",
        body: {
          attributes,
        },
      }),
      onQueryStarted: httpSuccessNotification("Порядок атрибутів оновлено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }),
    updateAttribute: build.mutation<AttributeDto, UpdateAttributeDto>({
      query: ({ id, ...body }) => ({
        url: `${ATTRIBUTE_ENDPOINT_PREFIX}/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно оновлено"),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: arg.id }],
    }),
    deleteAttribute: build.mutation<AttributeDto, number>({
      query: (id) => ({
        url: `${ATTRIBUTE_ENDPOINT_PREFIX}/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно видалено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }), */
  }),
});
