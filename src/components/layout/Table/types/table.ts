import { SortOrder } from "@utils/enums/sort-order.enum";

export interface Column<T> {
  id: keyof T | "image";
  label: string;
  minWidth?: React.CSSProperties["width"];
  width?: React.CSSProperties["width"];
  align?: "right";
  type?: "image";
  headerClassName?: string;
  className?: string;
  sort?: boolean;
  renderColumn: (value: T) => string | React.ReactNode;
}

export interface Pagination {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange?: (value: number) => void;
  onRowsPerPageChange?: (value: number) => void;
}

export type TableSortOrder = SortOrder.ASC | SortOrder.DESC | false;
