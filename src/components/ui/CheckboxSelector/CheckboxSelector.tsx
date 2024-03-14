import React, { FC } from "react";

import { useSearchParams } from "react-router-dom";
import {
  Accordion,
  FormGroup,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import Icon from "@components/ui/Icon";
import CheckboxField from "@components/ui/CheckboxField";

import { CheckboxSelectorOption } from "./types/checkbox-selector-option";

import "./CheckboxSelector.scss";

interface BaseCheckboxSelectorProps {
  options: CheckboxSelectorOption[];
  label: string;
  queryName: string;
}

type ConditionalProps =
  | {
      enableSearch: true;
      onSearchChange: (value: string) => void;
    }
  | {
      enableSearch?: false;
      onSearchChange?: never;
    };

export type CheckboxSelectorProps = BaseCheckboxSelectorProps &
  ConditionalProps;

const CheckboxSelector: FC<CheckboxSelectorProps> = ({
  label,
  options,
  queryName,
  enableSearch = false,
  onSearchChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValues = searchParams.get(queryName)?.split("_") ?? [];

  function onChangeHandler(option: CheckboxSelectorOption) {
    let newSelectedValues = [...selectedValues];

    if (
      newSelectedValues.length &&
      newSelectedValues.find((item) => item === option.value)
    ) {
      newSelectedValues = newSelectedValues.filter(
        (item) => item !== option.value
      );
    } else {
      newSelectedValues.push(option.value);
    }

    if (newSelectedValues.length) {
      searchParams.set(queryName, newSelectedValues.join("_"));
    } else {
      searchParams.delete(queryName);
    }

    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      className="checkbox-selector">
      <AccordionSummary expandIcon={<Icon name="arrow-bottom" />}>
        {label}
      </AccordionSummary>
      <AccordionDetails>
        {enableSearch && (
          <input
            className="checkbox-selector__search"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        )}
        <FormGroup className="checkbox-selector__list scrollable">
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.value);

            return (
              <CheckboxField
                key={option.value}
                checked={isChecked}
                label={option.label}
                value={option.value}
                onChange={() => onChangeHandler(option)}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default CheckboxSelector;
