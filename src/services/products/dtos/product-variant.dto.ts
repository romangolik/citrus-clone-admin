import { ProductProperyDto } from "./product-property.dto";
import { ProductOptionValueDto } from "./product-option-value.dto";

import { AvailabilityStatus } from "../data/availability-status.enum";

export interface ProductVariantDto {
  id?: number;
  name: string;
  slug: string;
  rating: number;
  price: number;
  discountPrice?: number;
  sku?: string;
  optionValues: Omit<ProductOptionValueDto, "images">[];
  properties: ProductProperyDto[];
  status: AvailabilityStatus;
}