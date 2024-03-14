import { FC, PropsWithChildren } from "react";

import NiceModal from "@ebay/nice-modal-react";
import { SelectChangeEvent } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

import { Modals } from "@components/modals";

import BaseSelect from "../BaseSelect";

interface ConfirmationSelectFormFieldProps extends PropsWithChildren {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
  confirmationMessage: string;
  variant?: "standard" | "outlined" | "filled";
  onChange?: (selectedValue: string) => void;
}

const ConfirmationSelectFormField: FC<ConfirmationSelectFormFieldProps> = ({
  id,
  name,
  label,
  children,
  confirmationMessage,
  required = false,
  multiple = false,
  variant = "standard",
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

  function onChangeHandler(event: SelectChangeEvent) {
    if (field.value) {
      NiceModal.show(Modals.ConfirmationModal, {
        message: confirmationMessage,
      }).then((isConfirm) => {
        if (isConfirm) {
          changeSelectValue(event);
        }
      });
    } else {
      changeSelectValue(event);
    }
  }

  function changeSelectValue(event: SelectChangeEvent) {
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
      value={field.value ?? ""}
      errorHelperText={error?.message}
      onChange={onChangeHandler}>
      {children}
    </BaseSelect>
  );
};

export default ConfirmationSelectFormField;
