export enum ProductOptionType {
  COLOR = "COLOR",
  MODIFICATION = "MODIFICATION",
}

export const ProductOptionTypeLabel: Record<ProductOptionType, string> = {
  [ProductOptionType.COLOR]: "Колір",
  [ProductOptionType.MODIFICATION]: "Модифікація",
};