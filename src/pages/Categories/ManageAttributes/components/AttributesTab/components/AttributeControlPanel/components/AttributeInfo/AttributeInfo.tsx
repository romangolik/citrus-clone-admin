import React, { FC } from "react";

import { AttributeType } from "@services/attributes";

import Switch from "@components/ui/Switch";
import TextFormField from "@components/ui/TextFormField";

import AttributeTypeSelect from "../AttributeTypeSelect";
import AttributeGroupSelect from "../AttributeGroupSelect";

import "./AttributeInfo.scss";

interface AttributeInfoProps {
  comparableFieldHidden?: boolean;
  onTypeChange: (type: AttributeType) => void;
  onComparableChange: (value: boolean) => void;
}

const AttributeInfo: FC<AttributeInfoProps> = ({
  comparableFieldHidden = false,
  onTypeChange,
  onComparableChange,
}) => {
  return (
    <div className="attribute-info dg grid-gap20">
      <TextFormField name="name" label="Назва" required />
      <TextFormField name="slug" label="Slug" required />
      <AttributeTypeSelect onChange={onTypeChange} />
      <AttributeGroupSelect />
      <div className="attribute-info__switch df aic gap10">
        Активність атрибута
        <Switch name="active" />
      </div>
      <div className="attribute-info__switch df aic gap10">
        Основний атрибут
        <Switch name="isMain" />
      </div>
      {!comparableFieldHidden && (
        <div className="attribute-info__switch df aic gap10">
          Використовувати для фільтрації
          <Switch name="comparable" onChange={(_, checked) => onComparableChange(checked)} />
        </div>
      )}
    </div>
  );
};

export default AttributeInfo;
