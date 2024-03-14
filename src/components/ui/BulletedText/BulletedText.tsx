import { FC, CSSProperties } from "react";

import classNames from "classnames";

import "./BulletedText.scss";

interface BulletedTextProps {
  text: string;
  markSize?: number;
  className?: string;
  markColor?: CSSProperties["backgroundColor"];
  color?: "primary" | "secondary" | "success" | "error";
}

const BulletedText: FC<BulletedTextProps> = ({
  text,
  markColor,
  className,
  markSize = 10,
  color = "primary",
}) => {
  const markColorStyle = (
    markColor ? { "--mark-color": markColor } : {}
  ) as CSSProperties;

  return (
    <p
      className={classNames("bulleted-text aic", className, {
        "bulleted-text_primary": color === "primary",
        "bulleted-text_secondary": color === "secondary",
        "bulleted-text_success": color === "success",
        "bulleted-text_error": color === "error",
      })}>
      <span
        style={{
          height: markSize,
          width: markSize,
          ...markColorStyle,
        }}
        className="bulleted-text__mark published"></span>
      {text}
    </p>
  );
};

export default BulletedText;
