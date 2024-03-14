import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface PageLayoutContentProps extends PropsWithChildren {
  className?: string;
}

const PageLayoutContent: FC<PageLayoutContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames("page-layout__content dg grid-gap30", className)}>
      {children}
    </div>
  );
};

export default PageLayoutContent;
