import React, { FC } from "react";

import { useController, useFormContext } from "react-hook-form";
import { RadioGroup, FormControl, FormHelperText } from "@mui/material";

import { CategoryType } from "@services/categories";

import ContentBox from "@components/ui/ContentBox";
import RadioButton from "@components/ui/RadioButton";

//TODO: Використати готовий компонент RadioFormGroup

const CategoryTypeRadioGroup: FC = () => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: "type",
    control,
    defaultValue: "",
  });

  return (
    <ContentBox>
      <ContentBox.Header>
        <ContentBox.Title>Тип створюваної категорії</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content>
        <FormControl error={invalid}>
          <RadioGroup
            value={field.value}
            onChange={(_, value) => field.onChange(value)}>
            <RadioButton
              value={CategoryType.CATEGORIES}
              label="Категорія для категорій"
            />
            <RadioButton
              value={CategoryType.PRODUCTS}
              label="Категорія для продуктів"
            />
          </RadioGroup>
          {invalid && (
            <FormHelperText sx={{ marginLeft: 0 }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      </ContentBox.Content>
    </ContentBox>
  );
};

export default CategoryTypeRadioGroup;
