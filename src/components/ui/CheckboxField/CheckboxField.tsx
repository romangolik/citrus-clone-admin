import React, { FC } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CheckboxFieldProps {
  label: string;
  value: string;
  checked: boolean;
  className?: string;
  onChange: (value: string, checked: boolean) => void;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  label,
  value,
  checked,
  className,
  onChange,
}) => {
  function onChangeHandler(
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) {
    onChange(value, checked);
  }

  return (
    <FormControlLabel
      checked={checked}
      control={<Checkbox />}
      label={label}
      value={value}
      className={className}
      onChange={onChangeHandler}
    />
  );
};

export default CheckboxField;
