import React, { FC, useState } from "react";

import { TextFieldProps } from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import TextFormField from "@components/ui/TextFormField";

const PasswordFormField: FC<TextFieldProps> = ({
  name,
  label,
  variant = "standard",
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClickHandler = () => setShowPassword((show) => !show);

  const onMouseDownHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextFormField
      name={name}
      label={label}
      variant={variant}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickHandler}
              onMouseDown={onMouseDownHandler}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      onChange={onChange}
    />
  );
};

export default PasswordFormField;
