import { FC } from "react";

import { MenuItem, IconButton } from "@mui/material";

import {
  AvailabilityStatus,
  AvailabilityStatusLabel,
} from "@services/products";

import Icon from "@components/ui/Icon";
import TextFormField from "@components/ui/TextFormField";
import SelectFormField from "@components/ui/SelectFormField";

import "./ProductVariantItem.scss";

interface ProductVariantItemProps {
  index: number;
  onEdit: (index: number) => void;
}

const ProductVariantItem: FC<ProductVariantItemProps> = ({ index, onEdit }) => {
  return (
    <li className="product-variant-item df aifs gap15">
      <TextFormField
        name={`variants.${index}.name`}
        label="Назва"
        variant="outlined"
        required
        fullWidth
      />
      <TextFormField
        name={`variants.${index}.price`}
        label="Ціна"
        variant="outlined"
        type="number"
        required
        fullWidth
      />
      <SelectFormField
        id={`variant-${index}-status-select`}
        name={`variants.${index}.status`}
        label="Статус"
        fullWidth>
        {Object.values(AvailabilityStatus).map((value) => (
          <MenuItem key={value} value={value}>
            {AvailabilityStatusLabel[value]}
          </MenuItem>
        ))}
      </SelectFormField>
      <IconButton
        className="product-variant-item__edit-button"
        onClick={() => onEdit(index)}>
        <Icon name="edit" />
      </IconButton>
    </li>
  );
};

export default ProductVariantItem;
