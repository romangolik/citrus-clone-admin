import React, { FC, useState } from "react";

import { Autocomplete } from "@mui/material";
import { useController, useFormContext } from "react-hook-form"; 

import { AttributeValueDto } from "@services/attributes";

import TextFormField from "@components/ui/TextFormField";

interface AttributeValueSlugAutocompleteProps {
  index: number;
}

const AttributeValueSlugAutocomplete: FC<
  AttributeValueSlugAutocompleteProps
> = ({ index }) => {
  const { control, getValues } = useFormContext();
  const { field } = useController({
    name: `values.${index}.slug`,
    control,
  });

  const [options, setOptions] = useState<string[]>([]);

  function onFocusHandler() {
    const values = (getValues("values") as AttributeValueDto[])
      .map((item) => item.slug)
      .filter((item) => item);
    setOptions(Array.from(new Set(values)));
  }

  function onChangeHandler(event: any, value: string) {
    field.onChange(value);
  }

  return (
    <Autocomplete
      freeSolo
      id="slug-autocomplete"
      options={options}
      value={field.value ?? ""}
      onChange={onChangeHandler}
      onFocus={onFocusHandler}
      renderInput={(params) => (
        <TextFormField
          {...params}
          name={`values.${index}.slug`}
          label="Slug"
          variant="outlined"
          required
          inputProps={{
            ...params.inputProps,
            autoComplete: "disabled",
          }}
        />
      )}
    />
  );
};

export default AttributeValueSlugAutocomplete;
