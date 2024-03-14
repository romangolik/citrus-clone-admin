import { createSlice } from "@reduxjs/toolkit";

const progressBarSlice = createSlice({
  name: "progress-bar",
  initialState: {
    isShown: false,
  },
  reducers: {
    showProgressBar: (state) => {
      state.isShown = true;
    },
    hideProgressBar: (state) => {
      state.isShown = false;
    },
  },
});

export const { actions } = progressBarSlice;

export default progressBarSlice.reducer;
