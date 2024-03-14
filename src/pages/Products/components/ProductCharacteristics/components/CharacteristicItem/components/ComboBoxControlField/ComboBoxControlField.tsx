import { FC, PropsWithChildren } from "react";

import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

import { AttributeDto } from "@services/attributes";

import BaseSelect from "@components/ui/BaseSelect";

interface ComboBoxControlFieldProps extends PropsWithChildren {
  data: AttributeDto;
  index: number;
}

const ComboBoxControlField: FC<ComboBoxControlFieldProps> = ({
  data,
  index,
}) => {
  const name = `properties.${index}.value`;
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  function onChangeHandler(event: SelectChangeEvent) {
    field.onChange([event.target.value]);
  }

  return (
    <BaseSelect
      id={`attribute-${data.id}-value-select`}
      name={name}
      label={"Значення характеристики"}
      error={invalid}
      required
      variant="outlined"
      value={field.value}
      errorHelperText={error?.message}
      onChange={onChangeHandler}>
      {(data?.values ?? []).map((value: any) => (
        <MenuItem key={value.id} value={value.id}>
          {value.title}
        </MenuItem>
      ))}
    </BaseSelect>
  );
};

export default ComboBoxControlField;
