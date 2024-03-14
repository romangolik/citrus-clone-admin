export interface UpdateCategoryDto {
  id: number;
  name: string;
  slug: string;
  icon?: null | string;
  image?: string;
  parentId?: number;
  published: boolean;
}