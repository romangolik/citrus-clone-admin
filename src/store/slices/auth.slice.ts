import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserDto } from "@services/users";

interface AuthState {
  user: UserDto;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
    },
  },
});

export const { actions } = authSlice;

export default authSlice.reducer;
