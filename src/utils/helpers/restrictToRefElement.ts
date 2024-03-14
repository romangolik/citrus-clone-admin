import { Modifier } from "@dnd-kit/core";

import { restrictToBoundingRect } from "./restrictToBoundingRect";

export function restrictToRefElement(element: HTMLElement): Modifier {
  const elementRect = element?.getBoundingClientRect();

  return ({ transform, draggingNodeRect }) => {
    if (!draggingNodeRect || !elementRect) {
      return transform;
    }

    return restrictToBoundingRect(transform, draggingNodeRect, elementRect);
  };
}
