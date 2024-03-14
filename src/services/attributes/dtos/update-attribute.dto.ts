import { AttributeValueDto } from "./attribute-value.dto";

import { AttributeType } from "../data/attribute-type.enum";

export interface UpdateAttributeDto {
  id: number;
  name: string;
  slug: string;
  comparable: boolean;
  categoryId: number;
  active: boolean;
  type: AttributeType;
  attributeGroupId?: number;
  values?: AttributeValueDto[];
}