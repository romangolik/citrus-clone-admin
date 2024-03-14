import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./baseQueryWithReauth";
import {
  PROFILE_TAG,
  STICKERS_TAG,
  CATEGORIES_TAG,
  ATTRIBUTES_TAG,
  ATTRIBUTE_GROUPS_TAG,
} from "./tags";

export const baseService = createApi({
  reducerPath: "api",
  tagTypes: [
    PROFILE_TAG,
    STICKERS_TAG,
    CATEGORIES_TAG,
    ATTRIBUTES_TAG,
    ATTRIBUTE_GROUPS_TAG,
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
