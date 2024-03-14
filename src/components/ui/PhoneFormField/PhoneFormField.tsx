import { FC, forwardRef } from "react";

import { IMaskInput } from "react-imask";

import TextFormField from "../TextFormField";

interface PhoneMaskInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="+{38} (000) 000-00-00"
        unmask
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

PhoneMaskInput.displayName = "PhoneMaskInput";

const PhoneFormField: FC = () => {
  return (
    <TextFormField
      name="phone"
      label="Номер телефону"
      type="tel"
      required
      InputProps={{ inputComponent: PhoneMaskInput as any }}
    />
  );
};

export default PhoneFormField;
