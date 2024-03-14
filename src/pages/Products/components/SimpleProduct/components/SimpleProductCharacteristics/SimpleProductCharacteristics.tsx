import { FC, useRef, useState, useEffect } from "react";

import { useWatch, useFormContext } from "react-hook-form";

import { ProductProperyDto } from "@services/products";
import {
  AttributeDto,
  AttributeType,
  attributesService,
} from "@services/attributes";

import { fillAttributes } from "@utils/helpers/fillAttributes";
import ProductCharacteristics, {
  ProductCharacteristicItemData,
} from "@pages/Products/components/ProductCharacteristics";

import "./SimpleProductCharacteristics.scss";

const SimpleProductCharacteristics: FC = () => {
  const isFirstReceivedAttributes = useRef(true);

  const { control, getValues, setValue } = useFormContext();
  const [productProperties, setProductProperties] = useState<
    ProductCharacteristicItemData[]
  >([]);
  const categoryId = useWatch({
    control,
    name: "categoryId",
    defaultValue: getValues("categoryId"),
  });
  const { data: attributes } =
    attributesService.useGetAllAttributesByCategoryQuery(categoryId, {
      skip: !categoryId,
    });

  function updateProductProperties(productProperties: ProductProperyDto[]) {
    const filledProductProperties = fillAttributes(
      attributes,
      productProperties
    );
    setValue("properties", filledProductProperties);
    setProductProperties(
      filledProductProperties.map((productProperty, index) => ({
        ...productProperty,
        attribute: attributes[index],
      }))
    );
  }

  useEffect(() => {
    if (!attributes) return;

    updateProductProperties(
      isFirstReceivedAttributes.current ? getValues("properties") : []
    );

    isFirstReceivedAttributes.current = false;
  }, [attributes]);

  return (
    <ProductCharacteristics
      properties={productProperties}
      emptyListMessageProps={{
        title: "Список характеристик порожній",
        helperText: "Спочатку оберіть категорію для товару",
      }}
    />
  );
};

export default SimpleProductCharacteristics;
