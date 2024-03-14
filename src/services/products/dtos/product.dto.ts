import { StickerDto } from "@services/stickers";

import { ProductOptionDto } from "./product-option.dto";
import { ProductVariantDto } from "./product-variant.dto";
import { ProductProperyDto } from "./product-property.dto";
import { ShortProductImageDto } from "./short-product-image.dto";

import { ProductType } from "../data/product-type.enum";
import { AvailabilityStatus } from "../data/availability-status.enum";

interface BaseProductDto {
  id?: number;
  published: boolean;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  sku?: string;
  description: string;
  categoryId: number;
  warranty: number;
  stickers: StickerDto[];
  images: ShortProductImageDto[];
  properties: ProductProperyDto[];
  metaDescription?: string;
  metaKeywords?: string;
}

export interface SimpleProductDto extends BaseProductDto {
  type: ProductType.SIMPLE;
  rating: number;
  status: AvailabilityStatus;
}

export interface ConfigurableProductDto extends BaseProductDto {
  type: ProductType.CONFIGURABLE;
  options: ProductOptionDto[];
  variants: ProductVariantDto[];
}

export type ProductDto = SimpleProductDto | ConfigurableProductDto;
