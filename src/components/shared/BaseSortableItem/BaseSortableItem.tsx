import { forwardRef, PropsWithChildren } from "react";

import classNames from "classnames";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import Icon from "@components/ui/Icon";

import "./BaseSortableItem.scss";

interface BaseSortableItemProps extends PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
  dragOverlay?: boolean;
  listeners: SyntheticListenerMap;
}

const BaseSortableItem = forwardRef<HTMLLIElement, BaseSortableItemProps>(
  ({ className, children, listeners, style, dragOverlay }, ref) => {
    return (
      <li
        ref={ref}
        style={style}
        className={classNames(
          "base-sortable-item df aic jcsb",
          className,
          dragOverlay && "base-sortable-item_drag-overlay"
        )}>
        <button
          className="base-sortable-item__drag-handle sortable-list-item__drag-handle"
          {...listeners}>
          <Icon name="drag-handle" size="fill" colorVariant="base" />
        </button>
        {children}
      </li>
    );
  }
);

BaseSortableItem.displayName = "BaseSortableItem";

export default BaseSortableItem;
