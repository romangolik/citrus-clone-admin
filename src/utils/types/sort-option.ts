import { SortOrder } from "@utils/enums/sort-order.enum";

export interface SortOption<T> {
  attribute: keyof T;
  order: SortOrder;
  label: string;
}