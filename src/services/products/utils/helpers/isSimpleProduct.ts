import { ProductType } from "@services/products/data/product-type.enum";
import { ProductDto, SimpleProductDto } from "@services/products/dtos/product.dto";

export function isSimpleProduct(product: ProductDto): product is SimpleProductDto {
  return product.type === ProductType.SIMPLE;
}
