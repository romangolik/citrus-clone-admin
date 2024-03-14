import { FC, PropsWithChildren } from "react";

interface SlideoutPanelActionsProps extends PropsWithChildren {}

const SlideoutPanelActions: FC<SlideoutPanelActionsProps> = ({ children }) => {
  return (
    <footer className="slideout-panel__actions df aic jcfe gap20">
      {children}
    </footer>
  );
};

export default SlideoutPanelActions;
