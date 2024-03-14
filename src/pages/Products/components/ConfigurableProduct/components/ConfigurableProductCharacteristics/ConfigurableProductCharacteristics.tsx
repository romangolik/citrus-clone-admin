import { FC } from "react";

import { Button } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { AttributeDto } from "@services/attributes";
import { ProductProperyDto } from "@services/products";

import ProductCharacteristics from "@pages/Products/components/ProductCharacteristics";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";

import { useConfigurableProductContext } from "../../context";

import "./ConfigurableProductCharacteristics.scss";

function getSelectedAttributes(
  attributes: AttributeDto[],
  productProperties: ProductProperyDto[]
) {
  const productPropertiesAttributeIds = productProperties.map(
    (item) => item.attributeId
  );
  return attributes.reduce((arr, attribute) => {
    if (productPropertiesAttributeIds.includes(attribute.id)) {
      return [...arr, attribute];
    }

    return arr;
  }, []);
}

interface ConfigurableProductCharacteristicsProps {
  onChange: (value: AttributeDto[]) => void;
}

const ConfigurableProductCharacteristics: FC<
  ConfigurableProductCharacteristicsProps
> = ({ onChange }) => {
  const { control, getValues } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "properties",
  });
  const { getAttributesAsArray, getAttributesAsHashMap } =
    useConfigurableProductContext();
  const attributesHashMap = getAttributesAsHashMap();

  function openCharacteristicsSelectModal() {
    const attributes = getAttributesAsArray();
    NiceModal.show(Modals.ProductCharacteristicsSelectModal, {
      availableAttributes: attributes,
      productProperties: getSelectedAttributes(
        attributes,
        getValues("properties")
      ),
    }).then((result: AttributeDto[]) => {
      onChange(result);
    });
  }

  function renderButton() {
    if (!attributesHashMap || attributesHashMap.size === 0) {
      return null;
    }

    return (
      <Button
        color="success"
        size="small"
        startIcon={<Icon name="select-list" size="fill" />}
        onClick={openCharacteristicsSelectModal}>
        Обрати
      </Button>
    );
  }

  return (
    <ProductCharacteristics
      properties={
        attributesHashMap.size > 0
          ? (fields as unknown as ProductProperyDto[]).map((property) => ({
              ...property,
              attribute: attributesHashMap.get(property.attributeId),
            }))
          : []
      }
      buttonSlot={renderButton()}
      emptyListMessageProps={{
        title: "Список характеристик порожній",
        helperText:
          attributesHashMap?.size > 0
            ? "Оберіть характеристики, які будуть загальними для даного товару"
            : "Спочатку оберіть категорію для товару",
      }}
    />
  );
};

export default ConfigurableProductCharacteristics;
