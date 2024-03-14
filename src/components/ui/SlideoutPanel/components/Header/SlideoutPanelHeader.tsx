import { FC, PropsWithChildren } from "react";

import Icon from "@components/ui/Icon";

export interface SlideoutPanelHeaderProps extends PropsWithChildren {
  onClose: () => void;
}

const SlideoutPanelHeader: FC<SlideoutPanelHeaderProps> = ({ children, onClose }) => {
  return (
    <header className="slideout-panel__header df aic jcsb">
      <h2>{children}</h2>
      <button
        className="slideout-panel__close-button df aic jcc"
        onClick={onClose}>
        <Icon name="cancel" colorVariant="base" />
      </button>
    </header>
  );
};

export default SlideoutPanelHeader;
