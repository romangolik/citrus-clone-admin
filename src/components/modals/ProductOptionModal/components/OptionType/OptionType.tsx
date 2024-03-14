import { FC } from "react";

import classNames from "classnames";
import { useWatch, useFormContext } from "react-hook-form";

import { ProductOptionType } from "@services/products";

import Icon from "@components/ui/Icon";

import "./OptionType.scss";

interface OptionTypeProps {
  onChange?: (value: ProductOptionType) => void;
}

const OptionType: FC<OptionTypeProps> = ({ onChange }) => {
  const { control, getValues, setValue } = useFormContext();
  const optionType = useWatch({
    control: control,
    name: "type",
    defaultValue: getValues("type"),
  });
  const isColorOption = optionType === ProductOptionType.COLOR;

  function changeOptionType(newType: ProductOptionType) {
    setValue("type", newType, { shouldDirty: true });

    if (onChange) {
      onChange(newType);
    }
  }

  return (
    <div className="option-type">
      <button
        type="button"
        className={classNames(
          "option-type__button df aic jcc",
          !isColorOption && "option-type__button_active"
        )}
        onClick={() => changeOptionType(ProductOptionType.MODIFICATION)}>
        <Icon name="categories" className="option-type__button-icon" />
        Модифікації
      </button>
      <button
        type="button"
        className={classNames(
          "option-type__button df aic jcc",
          isColorOption && "option-type__button_active"
        )}
        onClick={() => changeOptionType(ProductOptionType.COLOR)}>
        <Icon name="color-option" className="option-type__button-icon" />
        Колір
      </button>
    </div>
  );
};

export default OptionType;
