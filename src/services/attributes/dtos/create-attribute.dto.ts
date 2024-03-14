import { CreateAttributeValueDto } from "./create-attribute-value.dto";

import { AttributeType } from "../data/attribute-type.enum";

export interface CreateAttributeDto {
  name: string;
  slug: string;
  comparable: boolean;
  active: boolean;
  isMain: boolean;
  categoryId: number;
  type: AttributeType;
  attributeGroupId?: number;
  values: CreateAttributeValueDto[];
}