import React, { FC } from "react";

import { useSearchParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

interface FilterCheckboxProps {
  label: string;
  value: string;
  group: string;
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({ label, value, group }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let selectedValues = searchParams.get(group)?.split("_") ?? [];

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (selectedValues.includes(value)) {
      selectedValues = selectedValues.filter((item) => item !== value);
    } else {
      selectedValues.push(value);
    }

    if (selectedValues.length) {
      searchParams.set(group, selectedValues.join("_"));
    } else {
      searchParams.delete(group);
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <FormControlLabel
      checked={selectedValues.includes(value)}
      control={<Checkbox />}
      label={label}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default FilterCheckbox;
