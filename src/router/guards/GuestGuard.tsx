import React, { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

import { Routes } from "@router/routes";

import { useAuth } from "@utils/hooks/useAuth";

export const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to={Routes.profile()} replace />;
  }

  return <>{children}</>;
};
