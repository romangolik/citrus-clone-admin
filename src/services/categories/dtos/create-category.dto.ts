import { CategoryType } from "../data/category-type.enum";

export interface CreateCategoryDto {
  name: string;
  slug: string;
  icon: null | string;
  image: string;
  type: CategoryType;
  parentId: null | number;
  published: boolean;
}