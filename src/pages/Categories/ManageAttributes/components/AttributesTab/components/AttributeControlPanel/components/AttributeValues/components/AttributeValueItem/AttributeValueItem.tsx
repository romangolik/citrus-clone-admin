import React, { forwardRef } from "react";

import classNames from "classnames";
import { useWatch } from "react-hook-form";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { TextField, IconButton, Switch as MuiSwitch } from "@mui/material";

import { AttributeValueDto } from "@services/attributes";

import Icon from "@components/ui/Icon";
import Switch from "@components/ui/Switch";
import TextFormField from "@components/ui/TextFormField";
import BaseSortableItem from "@components/shared/BaseSortableItem";

import AttributeValueSlugAutocomplete from "../AttributeValueSlugAutocomplete";

import "./AttributeValueItem.scss";

interface AttributeValueItemProps {
  data?: AttributeValueDto;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  dragOverlay?: boolean;
  disableDelete?: boolean;
  listeners: SyntheticListenerMap;
  onDelete: (index: number) => void;
}

const AttributeValueItem = forwardRef<HTMLLIElement, AttributeValueItemProps>(
  (
    {
      data,
      index,
      style,
      listeners,
      className,
      dragOverlay,
      disableDelete = false,
      onDelete,
    },
    ref
  ) => {
    const isComparableAttribute = useWatch({
      name: "comparable",
      defaultValue: false,
    });

    if (dragOverlay) {
      return (
        <BaseSortableItem
          ref={ref}
          dragOverlay
          style={style}
          listeners={listeners}
          className={classNames("attribute-value-item", className)}>
          <div className="attribute-value-item__fields df aifs gap20">
            <TextField
              label="Назва"
              variant="outlined"
              className="text-form-field"
              required
              value={data?.title ?? ""}
            />
            <TextField
              label="Slug"
              variant="outlined"
              className="text-form-field"
              required
              value={data?.slug ?? ""}
            />
            {isComparableAttribute && (
              <div className="attribute-value-item__switch df aic gap10">
                Є фільтром
                <MuiSwitch checked={data.isFilter} />
              </div>
            )}
          </div>
          <div className="df aic mla">
            <IconButton disabled={disableDelete}>
              <Icon name="basket" size="large" />
            </IconButton>
          </div>
        </BaseSortableItem>
      );
    }

    return (
      <BaseSortableItem
        ref={ref}
        style={style}
        listeners={listeners}
        className={classNames("attribute-value-item", className)}>
        <div className="attribute-value-item__fields df aifs gap20">
          <TextFormField
            name={`values.${index}.title`}
            label="Назва"
            variant="outlined"
            required
          />
          <AttributeValueSlugAutocomplete index={index} />
          {isComparableAttribute && (
            <div className="attribute-value-item__switch df aic gap10">
              Є фільтром
              <Switch name={`values.${index}.isFilter`} />
            </div>
          )}
        </div>
        <div className="df aic mla">
          <IconButton disabled={disableDelete} onClick={() => onDelete(index)}>
            <Icon name="basket" size="large" />
          </IconButton>
        </div>
      </BaseSortableItem>
    );
  }
);

AttributeValueItem.displayName = "AttributeValueItem";

export default AttributeValueItem;
