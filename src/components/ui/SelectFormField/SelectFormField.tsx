import { FC, ReactNode, PropsWithChildren } from "react";

import { SelectChangeEvent } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

import BaseSelect from "../BaseSelect";

interface SelectFormFieldProps extends PropsWithChildren {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
  fullWidth?: boolean;
  variant?: "standard" | "outlined" | "filled";
  onChange?: (selectedValue: string) => void;
  renderValue?: (selected: string | any[]) => ReactNode;
}

const SelectFormField: FC<SelectFormFieldProps> = ({
  id,
  name,
  label,
  children,
  required = false,
  multiple = false,
  fullWidth = false,
  variant = "standard",
  onChange,
  renderValue,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  function onChangeHandler(event: SelectChangeEvent) {
    field.onChange(event);
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <BaseSelect
      id={id}
      name={name}
      label={label}
      error={invalid}
      variant={variant}
      required={required}
      multiple={multiple}
      fullWidth={fullWidth}
      value={field.value}
      errorHelperText={error?.message}
      onChange={onChangeHandler}
      renderValue={renderValue}>
      {children}
    </BaseSelect>
  );
};

export default SelectFormField;
