import { FC } from "react";

import { AttributeDto, AttributeType } from "@services/attributes";

import ListControlField from "./components/ListControlField";
import ComboBoxControlField from "./components/ComboBoxControlField";
import LongTextControlField from "./components/LongTextControlField";
import ShortTextControlField from "./components/ShortTextControlField";

import "./CharacteristicItem.scss";

function getControlField(data: AttributeDto, index: number) {
  switch (data.type) {
    case AttributeType.COMBOBOX:
      return <ComboBoxControlField data={data} index={index} />;
    case AttributeType.LIST:
      return <ListControlField data={data} index={index} />;
    case AttributeType.SHORT_TEXT:
      return <ShortTextControlField index={index}/>;
    case AttributeType.LONG_TEXT:
      return <LongTextControlField index={index} />;
    default:
      return null;
  }
}

interface CharacteristicItemProps {
  index: number;
  data: AttributeDto;
}

const CharacteristicItem: FC<CharacteristicItemProps> = ({ index, data }) => {
  return (
    <li className="product-characteristic-item df gap30">
      <p className="product-characteristic-item__name h5">{data?.name}</p>
      {getControlField(data, index)}
    </li>
  );
};

export default CharacteristicItem;
