import { ProductOptionValueDto } from "./product-option-value.dto";

import { ProductOptionType } from "../data/product-option-type.enum";

export interface ProductOptionDto {
  id?: number;
  name: string;
  type: ProductOptionType;
  values: ProductOptionValueDto[];
}