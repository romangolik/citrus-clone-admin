import { FC } from "react";

import { useWatch, useFormContext } from "react-hook-form";

import { ProductProperyDto } from "@services/products";

import ProductCharacteristics from "@pages/Products/components/ProductCharacteristics";
import { useConfigurableProductContext } from "@pages/Products/components/ConfigurableProduct/context";

import "./ProductVariantCharacteristics.scss";

const ProductVariantCharacteristics: FC = () => {
  const { control, getValues } = useFormContext();
  const variantProperties: ProductProperyDto[] = useWatch({
    control,
    name: "properties",
    defaultValue: getValues("properties"),
  });
  const { getAttributesAsHashMap } = useConfigurableProductContext();
  const attributesHashMap = getAttributesAsHashMap();

  return (
    <ProductCharacteristics
      properties={
        attributesHashMap.size > 0
          ? variantProperties.map((property) => ({
              ...property,
              attribute: attributesHashMap.get(property.attributeId),
            }))
          : []
      }
      emptyListMessageProps={{
        title: "Список характеристик порожній",
      }}
    />
  );
};

export default ProductVariantCharacteristics;
