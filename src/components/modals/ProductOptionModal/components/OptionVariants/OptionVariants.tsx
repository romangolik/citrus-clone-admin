import { FC } from "react";

import { toast } from "react-toastify";
import { pointerWithin } from "@dnd-kit/core";
import { useWatch, useController, useFormContext } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";

import { ProductOptionType, ProductOptionValueDto } from "@services/products";

import OptionVariant from "./components/OptionVariant";
import SortableList from "@components/shared/SortableList";

import "./OptionVariants.scss";

const OptionVariants: FC = () => {
  const { control, getValues } = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name: "values",
  });
  const optionType = useWatch({
    control,
    name: "type",
    defaultValue: getValues("type"),
  });
  const isColorOption = optionType === ProductOptionType.COLOR;

  function onChangeHandler(
    event: any,
    value: (string | ProductOptionValueDto)[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string>
  ) {
    if (reason === "createOption") {
      const newOptionValue = details.option;
      const isValueExists =
        field.value.findIndex(
          (item: ProductOptionValueDto) => item.name === newOptionValue
        ) !== -1;
      if (isValueExists) {
        toast.info("Дане значення уже уже існує");
      } else {
        field.onChange([
          ...field.value,
          {
            name: newOptionValue,
            value: isColorOption ? "#000000" : newOptionValue,
            images: [],
          },
        ]);
      }
    }

    if (reason === "removeOption") {
      field.onChange(value);
    }
  }

  function removeOption(indexToRemove: number) {
    field.onChange(
      field.value.filter((_: any, index: number) => indexToRemove !== index)
    );
  }

  function changeOrder(data: ProductOptionValueDto[]) {
    field.onChange(data);
  }

  function updateOptionVariant(
    index: number,
    value: ProductOptionValueDto
  ) {
    field.onChange(
      field.value.map((item: ProductOptionValueDto, i: number) =>
        i === index ? value : item
      )
    );
  }

  return (
    <Autocomplete
      freeSolo
      id="option-variants-autocomplete"
      multiple
      clearOnBlur
      options={[]}
      className="option-variants"
      value={field?.value ?? []}
      getOptionLabel={(option: ProductOptionValueDto) => option.name}
      onChange={onChangeHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          name="values"
          variant="standard"
          label="Варіанти опції"
          error={invalid}
          helperText={invalid ? error.message : ""}
        />
      )}
      renderTags={(value: ProductOptionValueDto[]) => (
        <SortableList
          collisionDetection={pointerWithin}
          items={value}
          sortField="name"
          className={"option-variants__tags"}
          hideEmptyBlock
          onChange={changeOrder}
          strategy={() => null}
          renderItem={({
            ref,
            index,
            value,
            listeners,
            isOver,
            dragging,
            dragOverlay,
          }) => (
            <OptionVariant
              ref={ref as React.Ref<HTMLDivElement>}
              index={index}
              data={value}
              listeners={listeners}
              isColorVariant={isColorOption}
              isOver={isOver && !dragging && !dragOverlay}
              onRemove={removeOption}
              onUpdate={(data) => updateOptionVariant(index, data)}
            />
          )}
        />
      )}
    />
  );
};

export default OptionVariants;
