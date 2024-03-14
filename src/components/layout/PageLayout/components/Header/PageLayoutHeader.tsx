import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface PageLayoutHeaderProps extends PropsWithChildren {
  className?: string;
}

const PageLayoutHeader: FC<PageLayoutHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <header className={classNames("page-layout__header df jcsb", className)}>
      {children}
    </header>
  );
};

export default PageLayoutHeader;
