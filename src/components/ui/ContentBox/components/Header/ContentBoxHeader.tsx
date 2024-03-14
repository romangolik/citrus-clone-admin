import { FC, PropsWithChildren } from "react";

const ContentBoxHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="content-box__header df aic jcsb">{children}</header>
  );
};

export default ContentBoxHeader;
