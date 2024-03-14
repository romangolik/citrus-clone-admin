import { forwardRef } from "react";

import { Chip, IconButton } from "@mui/material";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { AttributeDto } from "@services/attributes";

import Icon from "@components/ui/Icon";
import BaseSortableItem from "@components/shared/BaseSortableItem";

interface AttributeListItemProps {
  data: AttributeDto;
  listeners: SyntheticListenerMap;
  dragOverlay?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onEdit: (value: AttributeDto) => void;
  onRemove: (value: number) => void;
}

const AttributeListItem = forwardRef<HTMLLIElement, AttributeListItemProps>(
  (
    { data, style, className, dragOverlay, listeners, onEdit, onRemove },
    ref
  ) => {
    return (
      <BaseSortableItem
        ref={ref}
        style={style}
        className={className}
        listeners={listeners}
        dragOverlay={dragOverlay}>
        <div className="df aic gap30">
          {data.name}
          <div className="df aic gap10">
            <Chip
              label={data.active ? "Активний" : "Не активний"}
              size="small"
              color={data.active ? "success" : "error"}
            />
            {data.comparable && (
              <Chip label="Для фільтрації" size="small" color="info" />
            )}
          </div>
        </div>
        <div className="df aic mla">
          <IconButton onClick={() => onEdit(data)}>
            <Icon name="edit" size="large" />
          </IconButton>
          <IconButton onClick={() => onRemove(data.id)}>
            <Icon name="basket" size="large" />
          </IconButton>
        </div>
      </BaseSortableItem>
    );
  }
);

AttributeListItem.displayName = "AttributeListItem";

export default AttributeListItem;
