import React, { FC } from "react";

import { NavLink } from "react-router-dom";

import Icon from "@components/ui/Icon";

import "./SidebarNavigationItem.scss";

interface SidebarNavigationItemProps {
  icon: string;
  text: string;
  href: string;
}

const SidebarNavigationItem: FC<SidebarNavigationItemProps> = ({
  icon,
  text,
  href,
}) => {
  return (
    <NavLink to={href} className="sidebar-navigation-item df aic cup">
      <Icon name={icon} className="sidebar-navigation-item__icon" />
      <p className="sidebar-navigation-item__text fz16">{text}</p>
    </NavLink>
  );
};

export default SidebarNavigationItem;
