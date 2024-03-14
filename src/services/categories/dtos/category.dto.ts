import { CategoryType } from "../data/category-type.enum";

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  icon: null | string;
  image: string;
  type: CategoryType;
  parentId: number;
  published: boolean;
}