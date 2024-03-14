import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface ContentBoxHeaderProps extends PropsWithChildren {
  className?: string;
}

const ContentBoxHeader: FC<ContentBoxHeaderProps> = ({ children, className }) => {
  return (
    <div className={classNames("content-box__content", className)}>{children}</div>
  );
};

export default ContentBoxHeader;
