import { FC, Children, useState, ReactNode, PropsWithChildren } from "react";

import {
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

interface BaseSelectProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  id: string;
  name: string;
  label: string;
  value?: string;
  error?: boolean;
  required?: boolean;
  multiple?: boolean;
  fullWidth?: boolean;
  errorHelperText?: string;
  variant?: "standard" | "outlined" | "filled";
  onChange?: (event: SelectChangeEvent<string | any[]>) => void;
  renderValue?: (selected: string) => ReactNode;
}

const BaseSelect: FC<BaseSelectProps> = ({
  id,
  name,
  label,
  value,
  children,
  errorHelperText,
  error = false,
  required = false,
  multiple = false,
  fullWidth = false,
  variant = "standard",
  onChange,
  renderValue,
}) => {
  const [focused, setFocused] = useState(false);

  function getValue(): string | any[] {
    const isArrayValue = Array.isArray(value) || multiple;
    const isFieldEmpty =
      Children.count(children) === 0 ||
      value === undefined ||
      value === null ||
      value.length === 0;

    if (!isFieldEmpty) {
      return value;
    }

    return isArrayValue ? [] : "";
  }

  return (
    <FormControl
      focused={focused}
      size="medium"
      error={error}
      variant={variant}
      required={required}
      fullWidth={fullWidth}
      className="select-form-field">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        required={required}
        multiple={multiple}
        value={getValue()}
        onOpen={() => setFocused(true)}
        onClose={() => setFocused(false)}
        onChange={(event) => onChange(event)}
        renderValue={renderValue}>
        {children}
      </Select>
      {error && <FormHelperText>{errorHelperText}</FormHelperText>}
    </FormControl>
  );
};

export default BaseSelect;
