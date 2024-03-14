import React, { FC } from "react";

import classNames from "classnames";
import { useController, useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import "./TextFormField.scss";

type TextFormFieldProps = TextFieldProps & {
  readOnly?: boolean;
}

const TextFormField: FC<TextFormFieldProps> = ({
  name,
  label,
  variant = "standard",
  readOnly = false,
  onChange,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  function onChangeHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    field.onChange(event);
    if (onChange) {
      onChange(event);
    }
  }

  return (
    <TextField
      size="medium"
      variant={variant}
      label={label}
      error={invalid}
      helperText={invalid ? error.message : ""}
      value={field.value ?? ""}
      className={classNames(
        "text-form-field",
        readOnly && "text-form-field_read-only"
      )}
      {...props}
      onChange={onChangeHandler}
    />
  );
};

export default TextFormField;
