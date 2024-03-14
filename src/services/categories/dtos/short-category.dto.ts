import { CategoryType } from "../data/category-type.enum";

export interface ShortCategoryDto {
  id: number;
  name: string;
  type: CategoryType;
  image: string;
  published: boolean;
}