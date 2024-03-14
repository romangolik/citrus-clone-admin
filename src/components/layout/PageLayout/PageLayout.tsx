import React, { FC, PropsWithChildren } from "react";

import classNames from "classnames";

import PageLayoutTitle from "./components/Title";
import PageLayoutHeader from "./components/Header";
import PageLayoutContent from "./components/Content";

import "./PageLayout.scss";

interface PageLayoutSubcomponents {
  Header: typeof PageLayoutHeader;
  Title: typeof PageLayoutTitle;
  Content: typeof PageLayoutContent;
}

interface PageLayoutComponentProps extends PropsWithChildren {
  className?: string;
}

type PageLayoutProps = FC<PageLayoutComponentProps> & PageLayoutSubcomponents;

const PageLayout: PageLayoutProps = ({ children, className }) => {
  return <section className={classNames("page-layout grid-gap30", className)}>{children}</section>;
};

PageLayout.Header = PageLayoutHeader;
PageLayout.Title = PageLayoutTitle;
PageLayout.Content = PageLayoutContent;

export default PageLayout;
