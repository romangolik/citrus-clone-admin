import { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import { Badge } from "@mui/material";

interface PageLayoutTitleProps extends PropsWithChildren {
  className?: string;
  badgeContent?: number;
}

const PageLayoutTitle: FC<PageLayoutTitleProps> = ({
  children,
  className,
  badgeContent = 0,
}) => {
  return (
    <h1 className={classNames("page-layout__title medium-weight", className)}>
      <Badge badgeContent={badgeContent} className="pt14">
        {children}
      </Badge>
    </h1>
  );
};

export default PageLayoutTitle;
