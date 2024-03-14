import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  type FetchArgs,
  type FetchBaseQueryMeta,
  type FetchBaseQueryError, 
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  timeout: 10000,
  credentials: "include",
});
