import { useMemo } from "react";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as UserActions } from "@store/slices/auth.slice";
import { actions as ProgressBarActions } from "@store/slices/progress-bar.slice";

const rootActions = {
  ...UserActions,
  ...ProgressBarActions
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};