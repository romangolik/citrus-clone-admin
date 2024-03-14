import React, { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";

import { IconProps } from "@components/ui/Icon";

import "./Link.scss";

interface LinkProps extends PropsWithChildren {
  to: string;
  startIcon?: React.ReactElement<IconProps>;
  endIcon?: React.ReactElement<IconProps>;
  variant?: "dashed";
  className?: string;
}

const Link: FC<LinkProps> = ({
  to,
  variant,
  endIcon,
  children,
  startIcon,
  className,
}) => {
  const startIconComponent = startIcon
    ? React.cloneElement(startIcon, {
        className: "link__start-icon",
      })
    : null;
  const endIconComponent = endIcon
    ? React.cloneElement(endIcon, {
        className: "link__end-icon",
      })
    : null;

  return (
    <RouterLink
      to={to}
      className={classNames("link dif aic", className, {
        link_dashed: variant === "dashed",
      })}>
      {startIconComponent}
      {children}
      {endIconComponent}
    </RouterLink>
  );
};

export default Link;
