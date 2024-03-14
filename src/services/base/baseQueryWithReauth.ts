/* eslint-disable @typescript-eslint/ban-types */
import { type FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  type BaseQueryApi,
  type QueryReturnValue,
} from "@reduxjs/toolkit/src/query/baseQueryTypes";

import { actions as authActions } from "@store/slices/auth.slice";
 
import { baseQuery } from "./baseQuery";

const AUTH_ERROR_CODE = 401;

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);

  if (isNeededRefresh(api)) {
    if (result.error && result.error.status === AUTH_ERROR_CODE) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: {}
        },
        api,
        extraOptions
      );
      if (refreshResult?.meta?.response?.status === 200) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(authActions.logout());
      }
    }
  }

  return result;
}

const NO_REFRESH_ROUTES = ["login", "logout", "refresh", "checkAuth"];

function isNeededRefresh(request: BaseQueryApi): boolean {
  return !NO_REFRESH_ROUTES.some((value) => request.endpoint.endsWith(value));
}
