import { AttributeValueDto } from "./attribute-value.dto";

import { AttributeType } from "../data/attribute-type.enum";

export interface AttributeDto {
  id: number;
  name: string;
  slug: string;
  comparable: boolean;
  active: boolean;
  isMain: boolean;
  type: AttributeType;
  categoryId: number;
  attributeGroupId: number;
  values: AttributeValueDto[];
}
