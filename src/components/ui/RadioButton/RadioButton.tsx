import React, { FC } from "react";

import Radio from "@mui/material/Radio";
import { FormControlLabel } from "@mui/material";

interface RadioButtonProps {
  value: string;
  label: string;
  onChange?: () => void;
}

const RadioButton: FC<RadioButtonProps> = ({ value, label }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={label}
    />
  );
};

export default RadioButton;
