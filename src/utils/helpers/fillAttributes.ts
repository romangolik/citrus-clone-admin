import { ProductProperyDto } from "@services/products";
import { AttributeDto, AttributeType } from "@services/attributes";

export function fillAttributes(
  attributes: AttributeDto[],
  productProperties: ProductProperyDto[],
  createNonExistentProperty = true
): ProductProperyDto[] {
  if (
    !attributes ||
    attributes.length === 0 ||
    (productProperties.length === 0 && !createNonExistentProperty)
  ) {
    return [];
  }

  return attributes.reduce((acc, attribute) => {
    const existingProperty = productProperties.find(
      (candidate) => candidate.attributeId === attribute.id
    );

    const isTextAttribute =
      attribute.type === AttributeType.LONG_TEXT ||
      attribute.type === AttributeType.SHORT_TEXT;

    if (!existingProperty) {
      if (createNonExistentProperty) {
        return [
          ...acc,
          {
            attributeId: attribute.id,
            value: isTextAttribute ? "" : [],
          },
        ];
      }

      return acc;
    }

    if (!isTextAttribute) {
      if (!Array.isArray(existingProperty.value)) {
        return [
          ...acc,
          {
            ...existingProperty,
            value: [],
          },
        ];
      }

      return [
        ...acc,
        {
          ...existingProperty,
          value:
            attribute.type === AttributeType.COMBOBOX
              ? existingProperty.value.slice(0, 1)
              : existingProperty.value,
        },
      ];
    }

    return [...acc, existingProperty];
  }, []);
}
