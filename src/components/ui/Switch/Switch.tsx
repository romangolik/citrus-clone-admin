import React, { FC } from "react";

import { useController, useFormContext } from "react-hook-form";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

interface SwitchProps extends MuiSwitchProps {
  name: string;
}

const Switch: FC<SwitchProps> = ({
  name,
  onChange: MuiSwitchOnChange,
  ...rest
}) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  function changeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    if (MuiSwitchOnChange) {
      MuiSwitchOnChange(event, checked);
    }
    onChange(event, checked);
  }

  return (
    <MuiSwitch {...rest} name={name} checked={value} onChange={changeHandler} />
  );
};

export default Switch;
