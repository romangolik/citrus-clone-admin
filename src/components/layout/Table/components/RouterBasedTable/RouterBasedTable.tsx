import { useSearchParams } from "react-router-dom";

import BaseTable from "../BaseTable";
import { Column, TableSortOrder } from "../../types/table";

import { SortOrder } from "@utils/enums/sort-order.enum";

import "./RouterBasedTable.scss";

interface RouterBasedTableProps<T> {
  data: T[];
  page: number;
  count: number;
  rowsPerPage: number;
  columns: Column<T>[];
  className?: string;
  enableDelete?: boolean;
  onPageChange?: (value: number) => void;
  onRowsPerPageChange?: (value: number) => void;
  onSortChange?: (attribute: string, order: TableSortOrder) => void;
  onDeleteAction?: (value: number) => void;
}

const SORT_SEPARATOR = "-";

const RouterBasedTable = <T extends { id: number }>({
  data,
  page,
  count,
  columns,
  className,
  rowsPerPage,
  enableDelete = false,
  onPageChange,
  onSortChange,
  onDeleteAction,
  onRowsPerPageChange,
}: RouterBasedTableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortAttribute, sortDirection] = (
    searchParams.get("sort") ?? SORT_SEPARATOR
  ).split(SORT_SEPARATOR) as [string, SortOrder];

  function pageChangeHandler(newPage: number) {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);

    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  function rowsPerPageChangeHandler(newValue: number) {
    searchParams.set("page", "1");
    searchParams.set("limit", String(newValue));
    setSearchParams(searchParams);

    if (onRowsPerPageChange) {
      onRowsPerPageChange(newValue);
    }
  }

  function sortChangeHandler(attribute: string, order: TableSortOrder) {
    if (order) {
      searchParams.set("sort", attribute + SORT_SEPARATOR + order);
    } else {
      searchParams.delete("sort");
    }
    searchParams.delete("page");
    setSearchParams(searchParams);

    if (onSortChange) {
      onSortChange(attribute, order);
    }
  }

  function deleteHandler(id: number) {
    if (onDeleteAction) {
      onDeleteAction(id);
    }
  }

  return (
    <BaseTable
      data={data}
      columns={columns}
      className={className}
      enableDelete={enableDelete}
      order={sortDirection}
      orderBy={sortAttribute}
      pagination={{
        page,
        count,
        rowsPerPage,
        onPageChange: pageChangeHandler,
        onRowsPerPageChange: rowsPerPageChangeHandler,
      }}
      onSortChange={sortChangeHandler}
      onDeleteAction={deleteHandler}
    />
  );
};

export default RouterBasedTable;
