import React, { forwardRef, PropsWithChildren } from "react";

import { Box } from "@mui/material";
import classNames from "classnames";

import ContentBoxTitle from "./components/Title";
import ContentBoxHeader from "./components/Header";
import ContentBoxContent from "./components/Content";

import "./ContentBox.scss";

interface ContentBoxProps extends PropsWithChildren {
  className?: string;
}

const ContentBox = forwardRef(
  (
    { children, className }: ContentBoxProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Box ref={ref} className={classNames("content-box br10", className)}>
        {children}
      </Box>
    );
  }
);

ContentBox.displayName = "ContentBox";

export default Object.assign(ContentBox, {
  Header: ContentBoxHeader,
  Title: ContentBoxTitle,
  Content: ContentBoxContent,
});
