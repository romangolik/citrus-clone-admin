import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface SlideoutPanelContentProps extends PropsWithChildren {
  className?: string;
}

const SlideoutPanelContent: FC<SlideoutPanelContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames("slideout-panel__content scrollable", className)}>
      {children}
    </div>
  );
};

export default SlideoutPanelContent;
