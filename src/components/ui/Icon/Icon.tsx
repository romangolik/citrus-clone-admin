import React, { FC } from "react";

import classNames from "classnames";

import sprite from "@assets/icons/sprite.svg";

import "./Icon.scss";

export interface IconProps {
  className?: string;
  name: string;
  size?: "small" | "normal" | "large" | "fill";
  colorVariant?: "none" | "base";
  sx?: React.CSSProperties;
}

const Icon: FC<IconProps> = ({
  name,
  className,
  size = "normal",
  colorVariant = "none",
  sx = {},
}) => {
  return (
    <svg
      className={classNames("icon", className, {
        "icon_base-color": colorVariant === "base",
        "icon_size-small": size === "small",
        "icon_size-normal": size === "normal",
        "icon_size-large": size === "large",
        "icon_size-fill": size === "fill",
      })}
      style={sx}>
      <use xlinkHref={`${sprite}#${name}`}></use>
    </svg>
  );
};

export default Icon;
