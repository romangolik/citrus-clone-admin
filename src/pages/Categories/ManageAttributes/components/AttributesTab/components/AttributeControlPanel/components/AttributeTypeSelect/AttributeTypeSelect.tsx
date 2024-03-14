import React, { FC } from "react";

import { MenuItem } from "@mui/material";

import { AttributeType, AttributeTypeTitles } from "@services/attributes";

import SelectFormField from "@components/ui/SelectFormField";

interface AttributeTypeSelectProps {
  onChange?: (type: AttributeType) => void;
}

const AttributeTypeSelect: FC<AttributeTypeSelectProps> = ({ onChange }) => {
  function onChangeHandler(type: AttributeType) {
    if (onChange) {
      onChange(type);
    }
  }

  return (
    <SelectFormField
      id="attribute-type-select"
      name="type"
      label="Тип"
      required
      onChange={onChangeHandler}>
      {Object.values(AttributeType).map((value) => (
        <MenuItem key={value} value={value}>
          {AttributeTypeTitles[value]}
        </MenuItem>
      ))}
    </SelectFormField>
  );
};

export default AttributeTypeSelect;
