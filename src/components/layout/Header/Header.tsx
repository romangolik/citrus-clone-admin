import React, { FC } from "react";

import { Avatar, IconButton } from "@mui/material";

import { authService } from "@services/auth";

import Link from "@components/ui/Link";
import Icon from "@components/ui/Icon";

import { Routes } from "@router/routes";

import { useAuth } from "@utils/hooks/useAuth";

import "./Header.scss";

const Header: FC = () => {
  const { user } = useAuth();
  const [logout] = authService.useLogoutMutation();

  function exitHandler() {
    logout();
  }

  return (
    <header className="header df jcfe aic">
      <div className="header__user-info df aic">
        <Avatar
          className="header__user-avatar"
          alt="User image"
          src={user.avatar}>
          <Icon name="person" className="header__user-avatar-fallback" />
        </Avatar>
        <Link to={Routes.profile()}>{user.email}</Link>
      </div>
      <IconButton className="header__exit-button" onClick={exitHandler}>
        <Icon name="exit" size="large" className="header__exit-button-icon" />
      </IconButton>
    </header>
  );
};

export default Header;
