import React, { useState } from "react";

import classNames from "classnames";
import {
  arrayMove,
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Modifiers,
  useSensor,
  DndContext,
  useSensors,
  DragOverlay,
  DragEndEvent,
  closestCenter,
  DropAnimation,
  PointerSensor,
  DragStartEvent,
  KeyboardSensor,
  UniqueIdentifier,
  CollisionDetection,
  DraggableSyntheticListeners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

import SortableListItem from "./components/Item";

import { RenderItemFunc } from "./types/render-item-func.type";

import EmptyListMessage from "../EmptyListMessage";

import "./SortableList.scss";

interface SortableListProps<T> {
  items: T[];
  handle?: boolean;
  adjustScale?: boolean;
  className?: string;
  sortField: keyof T;
  modifiers?: Modifiers;
  scrollable?: boolean;
  vertical?: boolean;
  style?: React.CSSProperties;
  emptyListProps?: {
    title: string;
    helperText?: string;
  };
  hideEmptyBlock?: boolean;
  strategy?: SortingStrategy;
  renderItem: RenderItemFunc<T>;
  collisionDetection?: CollisionDetection;
  onChange: (array: T[], from: number, to: number) => void;
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const SortableList = <T extends object>({
  items,
  handle,
  className,
  sortField,
  scrollable,
  adjustScale,
  emptyListProps,
  style = {},
  modifiers = [],
  vertical = false,
  hideEmptyBlock = false,
  collisionDetection = closestCenter,
  onChange,
  strategy,
  renderItem,
}: SortableListProps<T>): React.ReactElement => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item[sortField] === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const itemsIds = items.map((item) => item[sortField] as UniqueIdentifier);

  function dragStartHandler({ active }: DragStartEvent) {
    if (!active) {
      return;
    }

    setActiveId(active.id);
  }

  function dragEndHandler({ over }: DragEndEvent) {
    if (over) {
      const overIndex = getIndex(over.id);

      if (activeIndex !== overIndex) {
        onChange(
          arrayMove(items, activeIndex, overIndex),
          activeIndex,
          overIndex
        );
      }
    }

    setActiveId(null);
  }

  function dragCancelHandler() {
    setActiveId(null);
  }

  function getSortingStrategy(): SortingStrategy {
    if (strategy) {
      return strategy;
    }

    return vertical
      ? verticalListSortingStrategy
      : horizontalListSortingStrategy;
  }

  function renderDragOverlay1(index: number) {
    return (
      <SortableListItem
        index={index}
        value={items[index]}
        dragOverlay
        renderItem={renderItem}
      />
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragCancel={dragCancelHandler}
      modifiers={modifiers}>
      <SortableContext items={itemsIds} strategy={getSortingStrategy()}>
        <ul
          style={{
            gridAutoFlow: vertical ? "row" : "column",
            ...style,
          }}
          className={classNames(
            "sortable-list",
            !!className && className,
            scrollable && "scrollable",
            items.length === 0 && "sortable-list_empty"
          )}>
          {items.map((value, index) => (
            <SortableListItem
              key={String(value[sortField])}
              id={value[sortField] as UniqueIdentifier}
              index={index}
              handle={handle}
              value={value}
              renderItem={renderItem}
            />
          ))}
          {!hideEmptyBlock && items.length === 0 && (
            <EmptyListMessage
              title={emptyListProps?.title}
              helperText={emptyListProps?.helperText}
            />
          )}
        </ul>
      </SortableContext>
      <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
        {activeIndex !== -1 ? renderDragOverlay1(activeIndex) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableList;
