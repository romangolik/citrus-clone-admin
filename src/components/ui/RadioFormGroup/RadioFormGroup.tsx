import React, { FC, PropsWithChildren } from "react";

import { useController, useFormContext } from "react-hook-form";
import { RadioGroup, FormControl, FormHelperText } from "@mui/material";

import "./RadioFormGroup.scss";

interface RadioFormGroupProps extends PropsWithChildren {
  name: string;
  hideErrorMessage?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioFormGroup: FC<RadioFormGroupProps> = ({
  name,
  children,
  hideErrorMessage = false,
  onChange,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    field.onChange(event);
    if (onChange) {
      onChange(event);
    }
  }

  return (
    <FormControl error={invalid}>
      <RadioGroup value={field.value} onChange={onChangeHandler}>
        {children}
      </RadioGroup>
      {invalid && !hideErrorMessage && (
        <FormHelperText sx={{ marginLeft: 0 }}>{error.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioFormGroup;
