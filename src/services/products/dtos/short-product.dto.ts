import { ShortCategoryDto } from "@services/categories/dtos/short-category.dto";

import { ShortProductImageDto } from "./short-product-image.dto";

import { ProductType } from "../data/product-type.enum";

export interface ShortProductDto {
  id: number;
  published: boolean;
  type: ProductType;
  name: string;
  images: ShortProductImageDto[];
  category: ShortCategoryDto;
}
