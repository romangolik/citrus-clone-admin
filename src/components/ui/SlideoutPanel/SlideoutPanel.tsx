/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import { Drawer } from "@mui/material";

import SlideoutPanelHeader from "./components/Header";
import SlideoutPanelContent from "./components/Content/SlideoutPanelContent";
import SlideoutPanelActions from "./components/Actions/SlideoutPanelActions";

import "./SlideoutPanel.scss";

interface SlideoutPanelSubcomponents {
  Header: typeof SlideoutPanelHeader;
  Content: typeof SlideoutPanelContent;
  Actions: typeof SlideoutPanelActions;
}

interface SlideoutPanelProps extends PropsWithChildren {
  open: boolean;
  className?: string;
  onClose: () => void;
}

const SlideoutPanel: SlideoutPanelSubcomponents & FC<SlideoutPanelProps> = ({
  open,
  children,
  className,
  onClose,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className={classNames("slideout-panel df fdc", className)}>
        {children}
      </div>
    </Drawer>
  );
};

SlideoutPanel.Header = SlideoutPanelHeader;
SlideoutPanel.Content = SlideoutPanelContent;
SlideoutPanel.Actions = SlideoutPanelActions;

export default SlideoutPanel;
