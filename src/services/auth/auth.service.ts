import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { baseService } from "@services/base";
import { UserDto, usersService } from "@services/users";

import { actions as authActions } from "@store/slices/auth.slice";

import { AuthDto } from "./dtos/auth.dto";

const AUTH_EDNPOINT_PREFIX = "/auth";

export const authService = baseService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserDto, AuthDto>({
      query: (body) => ({
        url: `${AUTH_EDNPOINT_PREFIX}/login`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          toast.success("Авторизація виконана успішно");
          dispatch(authActions.setUser(data));
        } catch {}
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `${AUTH_EDNPOINT_PREFIX}/logout`,
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(authActions.logout());
        } catch {}
      },
    }),
    checkAuth: build.mutation<UserDto, void>({
      queryFn: async (arg, { dispatch }, extraOptions, baseQuery) => {
        const refreshResponse = await baseQuery({
          url: `${AUTH_EDNPOINT_PREFIX}/refresh`,
          method: "POST",
        });

        if (refreshResponse.error) {
          return { error: refreshResponse.error };
        }

        const profileDataResponse = await dispatch(
          usersService.endpoints.profile.initiate()
        );

        if (profileDataResponse.error) {
          return { error: profileDataResponse.error as FetchBaseQueryError };
        }

        return { data: profileDataResponse.data as UserDto };
      },
    }),
  }),
});
