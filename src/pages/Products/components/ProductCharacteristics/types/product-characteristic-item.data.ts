import { AttributeDto } from "@services/attributes";

export interface ProductCharacteristicItemData {
  id?: number;
  attributeId: number;
  attribute: AttributeDto;
  value: string | number[];
}
