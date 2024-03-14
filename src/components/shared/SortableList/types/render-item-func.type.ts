import { Transform } from "@dnd-kit/utilities";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

export type RenderItemFunc<T> = (args: {
  dragOverlay: boolean;
  dragging: boolean;
  isOver: boolean;
  index: number | undefined;
  listeners: DraggableSyntheticListeners;
  ref: React.Ref<HTMLElement>;
  transform: Transform;
  transition: string;
  value: T;
}) => React.ReactElement;
