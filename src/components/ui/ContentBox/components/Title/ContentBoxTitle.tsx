import { FC, PropsWithChildren } from "react";

const ContentBoxTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="content-box__title h3 medium-weight df aic jcsb">
      {children}
    </h2>
  );
};

export default ContentBoxTitle;
