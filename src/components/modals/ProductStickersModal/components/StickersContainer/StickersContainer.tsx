import { FC, PropsWithChildren } from "react";

import "./StickersContainer.scss";

interface StickersContainerProps extends PropsWithChildren {
  label: string;
}

const StickersContainer: FC<StickersContainerProps> = ({
  label,
  children,
}) => {
  return (
    <div className="stickers-container df fdc br10 scrollable">
      <div className="stickers-container__header">{label}</div>
      <ul className="stickers-container__list">{children}</ul>
    </div>
  );
};

export default StickersContainer;
