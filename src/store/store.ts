import NiceModal from "@ebay/nice-modal-react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { baseService } from "@services/base";

import authReducer from "./slices/auth.slice";
import progressBarReducer from "./slices/progress-bar.slice";
import { rtkQueryErrorLogger, rtkProgressBarMiddleware } from "./middleware";

const reducer = combineReducers({
  [baseService.reducerPath]: baseService.reducer,
  modals: NiceModal.reducer,
  progressBar: progressBarReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseService.middleware)
      .concat(rtkProgressBarMiddleware)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
