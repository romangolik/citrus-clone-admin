import { baseService, ATTRIBUTE_GROUPS_TAG } from "@services/base";

import { AttributeGroupDto } from "./dtos/attribute-group.dto";
import { CreateAttributeGroupDto } from "./dtos/create-attribute-group.dto";

import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

function getEndpoint(
  categoryId: number,
  attributeGroupId: number = null
): string {
  return (
    `/categories/${categoryId}/attribute-groups` +
    (attributeGroupId ? `/${attributeGroupId}` : "")
  );
}

export const attributeGroupsService = baseService.injectEndpoints({
  endpoints: (build) => ({
    getAllAttributeGroupsByCategory: build.query<AttributeGroupDto[], number>({
      query: (categoryId) => getEndpoint(categoryId),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: ATTRIBUTE_GROUPS_TAG,
                id,
              })),
              { type: ATTRIBUTE_GROUPS_TAG, id: "ALL" },
            ]
          : [{ type: ATTRIBUTE_GROUPS_TAG, id: "ALL" }],
    }),
    createAttributeGroup: build.mutation<
      AttributeGroupDto,
      CreateAttributeGroupDto
    >({
      query: ({ categoryId, ...body }) => ({
        url: getEndpoint(categoryId),
        method: "POST",
        body,
      }),
      onQueryStarted: httpSuccessNotification(
        "Група атрибутів успішно створена"
      ),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTE_GROUPS_TAG, id: "ALL" }],
    }),
    updateAttributeGroup: build.mutation<AttributeGroupDto, AttributeGroupDto>({
      query: ({ id, categoryId, ...body }) => ({
        url: getEndpoint(categoryId, id),
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification(
        "Дані групи атрибутів успішно оновлено"
      ),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: ATTRIBUTE_GROUPS_TAG, id: arg.id }],
    }),
    reorderAttributeGroups: build.mutation<
      void,
      { categoryId: number; groupIds: number[] }
    >({
      query: ({ categoryId, ...body }) => ({
        url: getEndpoint(categoryId) + "/reorder",
        method: "PUT",
        body,
      }),
    }),
    deleteAttributeGroup: build.mutation<
      AttributeGroupDto,
      { categoryId: number; id: number }
    >({
      query: ({ id, categoryId }) => ({
        url: getEndpoint(categoryId, id),
        method: "DELETE",
      }),
      onQueryStarted: httpSuccessNotification(
        "Група атрибутів успішно видалена"
      ),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: ATTRIBUTE_GROUPS_TAG, id: "ALL" }],
    }),
  }),
});
