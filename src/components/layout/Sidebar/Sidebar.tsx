import React, { FC } from "react";

import SidebarNavigationItem from "./components/SidebarNavigationItem";

import { Routes } from "@router/routes";

import logo from "@assets/images/logo.svg";

import "./Sidebar.scss";

const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__inner df fdc">
        <div className="sidebar__logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="sidebar__navigation df fdc">
          <SidebarNavigationItem
            href={Routes.orders()}
            icon="orders"
            text="Замовлення"
          />
          <SidebarNavigationItem
            href={Routes.categories()}
            icon="categories"
            text="Категорії"
          />
          <SidebarNavigationItem
            href={Routes.products()}
            icon="box"
            text="Продукти"
          />
          <SidebarNavigationItem
            href={Routes.stickers()}
            icon="sticker"
            text="Стікери"
          />
          <SidebarNavigationItem
            href={Routes.customers()}
            icon="customers"
            text="Клієнти"
          />
          <SidebarNavigationItem
            href={Routes.profile()}
            icon="profile"
            text="Профіль"
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
