import { baseService, ATTRIBUTES_TAG } from "@services/base";

import { AttributeDto } from "./dtos/attribute.dto";
import { CreateAttributeDto } from "./dtos/create-attribute.dto";
import { UpdateAttributeDto } from "./dtos/update-attribute.dto";

import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

function getEndpoint(categoryId: number, attributeId: number = null): string {
  return (
    `/categories/${categoryId}/attributes` +
    (attributeId ? `/${attributeId}` : "")
  );
}

export const attributesService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getAllAttributesByCategory: build.query<AttributeDto[], number>({
      query: (categoryId) => getEndpoint(categoryId),
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
      query: ({ categoryId, ...body }) => ({
        url: getEndpoint(categoryId),
        method: "POST",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно створено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }),
    updateAttribute: build.mutation<AttributeDto, UpdateAttributeDto>({
      query: ({ id, categoryId, ...body }) => ({
        url: getEndpoint(categoryId, id),
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно оновлено"),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: arg.id }],
    }),
    reorderAttributes: build.mutation<
      void,
      { categoryId: number; ids: number[] }
    >({
      query: ({ categoryId, ...body }) => ({
        url: getEndpoint(categoryId) + "/reorder",
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Порядок атрибутів оновлено"),
    }),
    deleteAttribute: build.mutation<
      AttributeDto,
      { categoryId: number; id: number }
    >({
      query: ({ id, categoryId }) => ({
        url: getEndpoint(categoryId, id),
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification("Атрибут успішно видалено"),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTES_TAG, id: "ALL" }],
    }),
  }),
});
