import { FC, ReactNode } from "react";

import ContentBox from "@components/ui/ContentBox";
import CharacteristicItem from "./components/CharacteristicItem";
import EmptyListMessage from "@components/shared/EmptyListMessage";

import { ProductCharacteristicItemData } from "./types/product-characteristic-item.data";

import "./ProductCharacteristics.scss";

interface ProductCharacteristicsProps {
  buttonSlot?: ReactNode;
  properties: ProductCharacteristicItemData[];
  emptyListMessageProps?: {
    title?: string;
    helperText?: string;
  }
}

//TODO: оптимізація перерисування
const ProductCharacteristics: FC<ProductCharacteristicsProps> = ({
  buttonSlot,
  properties,
  emptyListMessageProps,
}) => {
  return (
    <ContentBox className="product-characteristics">
      <ContentBox.Header>
        <ContentBox.Title>Характеристики</ContentBox.Title>
        {buttonSlot}
      </ContentBox.Header>
      <ContentBox.Content className="product-characteristics__content">
        <ul className="product-characteristics__list scrollable">
          {properties.length > 0 &&
            properties.map((item, index) => (
              <CharacteristicItem key={item.attributeId} index={index} data={item.attribute} />
            ))}
          {properties.length === 0 && (
            <EmptyListMessage
              title={emptyListMessageProps?.title}
              helperText={emptyListMessageProps?.helperText}
            />
          )}
        </ul>
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductCharacteristics;
