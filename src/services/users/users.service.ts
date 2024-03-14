import { PROFILE_TAG, baseService } from "@services/base";

import { actions as authActions } from "@store/slices/auth.slice";

import { UserDto } from "./dtos/user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

import { fileToFormData } from "@utils/helpers/fileToFormData";
import { ImageUploadResult } from "@utils/types/image-upload-result";
import { httpSuccessNotification } from "@utils/helpers/httpSuccessNotification";

const USERS_ENDPOINT_PREFIX = "/users";

export const usersService = baseService.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<UserDto, void>({
      query: () => `${USERS_ENDPOINT_PREFIX}/profile`,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setUser(data));
        } catch {}
      },
      providesTags: [PROFILE_TAG],
    }),
    uploadProfileAvatar: build.mutation<ImageUploadResult, File>({
      query: (avatar) => ({
        url: `${USERS_ENDPOINT_PREFIX}/profile/upload-image`,
        method: "POST",
        body: fileToFormData(avatar, "avatar"),
      })
    }),
    updateProfile: build.mutation<UserDto, UpdateUserDto>({
      query: (body) => ({
        url: `${USERS_ENDPOINT_PREFIX}/profile`,
        method: "PUT",
        body,
      }),
      onQueryStarted: httpSuccessNotification("Дані профілю успішно оновлено"),
      invalidatesTags: (result, error) => (error ? [] : [PROFILE_TAG]),
    }),
  }),
});
