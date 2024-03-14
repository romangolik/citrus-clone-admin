import { FC } from "react";

import { MenuItem } from "@mui/material";
import { useWatch, useFormContext } from "react-hook-form";

import {
  ProductType,
  AvailabilityStatus,
  AvailabilityStatusLabel,
} from "@services/products";

import ContentBox from "@components/ui/ContentBox";
import SelectFormField from "@components/ui/SelectFormField";

const ProductStatus: FC = () => {
  const { control } = useFormContext();
  const productType = useWatch({
    control,
    name: "type"
  });

  const isSimpleProduct = productType === ProductType.SIMPLE;

  if (!isSimpleProduct) {
    return null;
  }

  return (
    <ContentBox>
      <ContentBox.Header>
        <ContentBox.Title>Статус</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content>
        <SelectFormField
          id="product-status-select"
          name="status"
          label=""
          fullWidth>
          {Object.values(AvailabilityStatus).map((value) => (
            <MenuItem key={value} value={value}>
              {AvailabilityStatusLabel[value]}
            </MenuItem>
          ))}
        </SelectFormField>
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductStatus;
