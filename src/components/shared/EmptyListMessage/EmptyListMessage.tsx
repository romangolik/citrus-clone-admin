import { FC } from "react";

import { Badge } from "@mui/material";

import Icon from "@components/ui/Icon";

import "./EmptyListMessage.scss";

interface EmptyListMessageProps {
  title?: string;
  helperText?: string;
}

const EmptyListMessage: FC<EmptyListMessageProps> = ({ title, helperText }) => {
  return (
    <div className="empty-list-message df aic jcc fdc">
      <Badge badgeContent={0} variant="contained" showZero>
        <Icon name="categories" className="empty-list-message__icon" />
      </Badge>
      <h4 className="empty-list-message__title medium-weight">
        {title ? title : "Даних немає!"}
      </h4>
      {helperText && (
        <p className="empty-list-message__paragraph">{helperText}</p>
      )}
    </div>
  );
};

export default EmptyListMessage;
