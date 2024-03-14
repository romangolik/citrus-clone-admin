export enum CategoryType {
  PRODUCTS = "PRODUCTS",
  CATEGORIES = "CATEGORIES"
}

export const CategoryTypeTitles: Record<CategoryType, string> = {
  [CategoryType.PRODUCTS]: "Для продуктів",
  [CategoryType.CATEGORIES]: "Для категорій",
}