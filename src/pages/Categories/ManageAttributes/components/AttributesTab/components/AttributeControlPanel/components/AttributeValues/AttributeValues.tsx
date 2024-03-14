import React, { FC } from "react";

import { Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { AttributeValueDto } from "@services/attributes";

import Icon from "@components/ui/Icon";
import SortableList from "@components/shared/SortableList";
import AttributeValueItem from "./components/AttributeValueItem";

import "./AttributeValues.scss";

const AttributeValues: FC = () => {
  const { control, getValues } = useFormContext();
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "values",
  });

  function dragChangeHandler(array: any, from: number, to: number) {
    move(from, to);
  }

  function addAttributeValue() {
    append({ title: "", slug: "", isFilter: false });
  }

  function removeAttributeValue(index: number) {
    remove(index);
  }

  //TODO: переглянути renderItem
  return (
    <div className="attribute-values df fdc">
      <div className="attribute-values__header df aic jcsb">
        <h3>Значення</h3>
        <Button
          color="success"
          startIcon={<Icon name="plus" size="fill" />}
          onClick={addAttributeValue}>
          Додати
        </Button>
      </div>
      <SortableList
        handle
        vertical
        scrollable
        items={fields as unknown as AttributeValueDto[]}
        sortField="id"
        className="attribute-values__list"
        onChange={dragChangeHandler}
        renderItem={({ value, ref, listeners, dragOverlay, index }) => (
          <AttributeValueItem
            ref={ref as React.Ref<HTMLLIElement>}
            data={!dragOverlay ? value : getValues(`values.${index}`)}
            key={value.id}
            index={index}
            listeners={listeners}
            dragOverlay={dragOverlay}
            disableDelete={fields.length < 2}
            onDelete={removeAttributeValue}
          />
        )}
      />
    </div>
  );
};

export default AttributeValues;
