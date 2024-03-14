import {
  isPending,
  Middleware,
  isRejected,
  isFulfilled,
  MiddlewareAPI,
  isAsyncThunkAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { actions as ProgressBarActions } from "@store/slices/progress-bar.slice";

export const rtkProgressBarMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isAsyncThunkAction(action)) {
      if (isPending(action)) {
        api.dispatch(ProgressBarActions.showProgressBar());
      }
      if (
        isFulfilled(action) ||
        isRejected(action) ||
        isRejectedWithValue(action)
      ) {
        api.dispatch(ProgressBarActions.hideProgressBar());
      }
    }

    next(action);
  };
