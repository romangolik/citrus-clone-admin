import classNames from "classnames";
import {
  Table,
  TableRow,
  Checkbox,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  TableContainer,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

import Icon from "@components/ui/Icon";

import { Column, Pagination, TableSortOrder } from "../../types/table";

import { SortOrder } from "@utils/enums/sort-order.enum";

import notFoundDataImage from "@assets/images/not-found-data.svg";

import "./BaseTable.scss";

interface BaseTableProps<T extends { id: number }> {
  data: T[];
  order?: TableSortOrder;
  orderBy?: string;
  columns: Column<T>[];
  className?: string;
  enableDelete?: boolean;
  selecting?: boolean;
  pagination?: Pagination;
  selectedData?: T[];
  onSortChange?: (attribute: string, order: TableSortOrder) => void;
  onDeleteAction?: (value: number) => void;
  onSelectChange?: (data: T[]) => void;
}

const BaseTable = <T extends { id: number }>({
  data,
  order,
  orderBy,
  columns,
  className,
  pagination,
  selectedData,
  selecting = false,
  enableDelete = false,
  onSortChange,
  onDeleteAction,
  onSelectChange,
}: BaseTableProps<T>) => {
  const columnsCount = columns.length + Number(enableDelete);
  const selected = selectedData ?? [];

  function pageChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) {
    if (pagination?.onPageChange) {
      pagination.onPageChange(page + 1);
    }
  }

  function rowsPerPageChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (pagination?.onRowsPerPageChange) {
      pagination.onRowsPerPageChange(+event.target.value);
    }
  }

  function sortChangeHandler(attribute: string) {
    let newOrder: TableSortOrder = SortOrder.ASC;
    const sequenceOrder: TableSortOrder[] = [
      SortOrder.ASC,
      SortOrder.DESC,
      false,
    ];

    if (orderBy === attribute) {
      let pos = sequenceOrder.indexOf(order);
      if (pos !== -1) {
        pos++;
        if (pos >= sequenceOrder.length) pos = 0;
        newOrder = sequenceOrder[pos];
      }
    }

    if (onSortChange) {
      onSortChange(attribute, newOrder);
    }
  }

  function deleteHandler(id: number) {
    if (onDeleteAction) {
      onDeleteAction(id);
    }
  }

  function selectAllHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (onSelectChange) {
      if (event.target.checked) {
        onSelectChange(data);
        return;
      }
      onSelectChange([]);
    }
  }

  function selectClickHandler(selectedData: T) {
    const selectedIndex = selected.findIndex((item) => item.id === selectedData.id);
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, selectedData);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    if (onSelectChange) {
      onSelectChange(newSelected);
    }
  }

  function isSelected(id: number) {
    return selected.findIndex((item) => item.id === id) !== -1;
  }

  let emptyRows = 0;

  if (pagination) {
    const { page, rowsPerPage } = pagination;
    emptyRows = page > 1 ? Math.max(0, rowsPerPage - data.length) : 0;
  }

  function isAllSelected() {
    return data.length > 0 && selected.length === (pagination ? pagination.count : data.length);
  }

  function isIndeterminate() {
    return selected.length > 0 && selected.length < (pagination ? pagination.count : data.length);
  }

  return (
    <div className="table-wrapper">
      <TableContainer className={classNames("scrollable", className)}>
        <Table stickyHeader className="table">
          <TableHead className="table__head">
            <TableRow>
              {selecting && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={isIndeterminate()}
                    checked={isAllSelected()}
                    onChange={selectAllHandler}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  className={classNames(
                    "table__cell",
                    column.headerClassName,
                    column.type === "image" && "table__image-cell"
                  )}
                  style={{ width: column.width, minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}>
                  {column.sort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id && order ? order : "asc"}
                      onClick={() => sortChangeHandler(String(column.id))}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {enableDelete && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="table__row">
                {selecting && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSelected(item.id)}
                      onChange={() => selectClickHandler(item)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.align}
                    className={classNames(
                      "table__cell",
                      column.className,
                      column.type === "image" && "table__image-cell"
                    )}>
                    {column.renderColumn(item)}
                  </TableCell>
                ))}
                {enableDelete && (
                  <TableCell className="table__delete-cell">
                    <IconButton
                      className="table__delete-button"
                      onClick={() => deleteHandler(item.id)}>
                      <Icon name="cancel" size="large" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 98 * emptyRows,
                }}>
                <TableCell colSpan={columnsCount} />
              </TableRow>
            )}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnsCount}>
                  <div className="table__not-found-data">
                    <div className="table__not-found-data-content">
                      <img
                        alt="Not found data"
                        className="table__not-found-data-image"
                        src={notFoundDataImage}
                      />
                      <p className="table__not-found-data-text">
                        Дані не знайдено
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[1, 2, 3, 4, 5, 10, 25, 50]}
          component="div"
          page={pagination.page - 1}
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage}
          onPageChange={pageChangeHandler}
          onRowsPerPageChange={rowsPerPageChangeHandler}
        />
      )}
    </div>
  );
};

export default BaseTable;
