export enum ProductType {
  SIMPLE = "SIMPLE",
  CONFIGURABLE = "CONFIGURABLE",
}

export const ProductTypeLabel: Record<ProductType, string> = {
  [ProductType.SIMPLE]: "Простий",
  [ProductType.CONFIGURABLE]: "Конфігурований",
};
