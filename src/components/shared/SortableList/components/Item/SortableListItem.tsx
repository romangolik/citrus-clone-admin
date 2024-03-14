import React, { useEffect } from "react";

import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

import { RenderItemFunc } from "../../types/render-item-func.type";

interface SortableListItemProps<T> {
  id?: UniqueIdentifier;
  value: T;
  index?: number;
  handle?: boolean;
  dragOverlay?: boolean;
  renderItem: RenderItemFunc<T>;
}

const SortableListItem = <T extends object>({
  id,
  index,
  value,
  handle,
  dragOverlay = false,
  renderItem,
}: SortableListItemProps<T>) => {
  const { setNodeRef, listeners, isDragging, transform, transition, isOver } =
    useSortable({
      id,
    });

  const style = {
    transition: [transition].filter(Boolean).join(", "),
    "--translate-x": transform ? `${Math.round(transform.x)}px` : undefined,
    "--translate-y": transform ? `${Math.round(transform.y)}px` : undefined,
    "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
    "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
  } as React.CSSProperties;

  useEffect(() => {
    if (!dragOverlay) {
      return;
    }

    document.body.style.cursor = "grabbing";

    return () => {
      document.body.style.cursor = "";
    };
  }, [dragOverlay]);

  const ListItemComponent = renderItem({
    dragOverlay: Boolean(dragOverlay),
    dragging: isDragging,
    index,
    listeners,
    ref: setNodeRef,
    transform,
    transition,
    value,
    isOver,
  });

  return React.cloneElement(ListItemComponent, {
    className: classNames(
      ListItemComponent?.props?.className,
      "sortable-list-item",
      isDragging && "sortable-list-item_dragging",
      dragOverlay && "sortable-list-item_drag-overlay",
      handle && "sortable-list-item_with-handle"
    ),
    style,
  });
};

export default SortableListItem;
