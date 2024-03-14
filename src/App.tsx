import React, { FC, useState, useEffect } from "react";

import { RouterProvider } from "react-router-dom";

import { authService } from "@services/auth";

import router from "@router/index";

export const App: FC = () => {
  const [isMounted, setMountedState] = useState(false);
  const [checkAuth, { isSuccess, isError }] =
    authService.useCheckAuthMutation();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isSuccess || isError) {
      setMountedState(true);
    }
  }, [isSuccess, isError]);

  if (!isMounted) {
    return <div>Loading ...</div>;
  }

  return <RouterProvider router={router} />;
};
