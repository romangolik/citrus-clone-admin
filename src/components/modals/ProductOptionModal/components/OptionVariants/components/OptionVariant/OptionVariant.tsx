import React, { useRef, useState, forwardRef, CSSProperties } from "react";

import classNames from "classnames";
import { Chip } from "@mui/material";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { ProductOptionValueDto } from "@services/products";

import VisuallyHiddenInput from "@components/ui/VisuallyHiddenInput";

import { useEventListener } from "@utils/hooks/useEventListener";

import "./OptionVariant.scss";

interface OptionVariantProps {
  index: number;
  data: ProductOptionValueDto;
  listeners: SyntheticListenerMap;
  className?: string;
  style?: CSSProperties;
  isOver?: boolean;
  isColorVariant: boolean;
  onRemove?: (value: number) => void;
  onUpdate?: (value: ProductOptionValueDto) => void;
}

const OptionVariant = forwardRef<HTMLDivElement, OptionVariantProps>(
  (
    {
      index,
      data,
      style,
      className,
      listeners,
      isColorVariant,
      isOver = false,
      onRemove,
      onUpdate,
    },
    ref
  ) => {
    const isColorChanges = useRef(false);
    const inputRef = useRef<HTMLInputElement>();
    const [color, setColor] = useState("#000000");

    function colorSaveHandler(event: Event) {
      const element = event.target as HTMLInputElement;
      isColorChanges.current = false;
      if (onUpdate) {
        onUpdate({
          ...data,
          value: element.value,
        });
      }
    }

    useEventListener("change", colorSaveHandler, inputRef);

    function deleteHandler() {
      if (onRemove) {
        onRemove(index);
      }
    }

    function colorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
      setColor(event.target.value);
      isColorChanges.current = true;
    }

    function openColorPicker() {
      if (isColorVariant) {
        inputRef.current.value = data.value;
        inputRef.current.click();
      }
    }

    return (
      <div
        ref={ref}
        style={style}
        className={classNames(
          "option-variant",
          className,
          isOver && "option-variant_over"
        )}
        {...listeners}>
        <Chip
          icon={
            isColorVariant ? (
              <span
                style={{
                  display: "block",
                  height: 8,
                  width: 8,
                  borderRadius: "50%",
                  backgroundColor: isColorChanges.current ? color : data.value,
                }}
              />
            ) : null
          }
          label={data.name}
          onDelete={deleteHandler}
          onClick={openColorPicker}
        />
        <VisuallyHiddenInput
          ref={inputRef}
          type="color"
          onChange={colorChangeHandler}
        />
      </div>
    );
  }
);

OptionVariant.displayName = "OptionVariant";

export default OptionVariant;
