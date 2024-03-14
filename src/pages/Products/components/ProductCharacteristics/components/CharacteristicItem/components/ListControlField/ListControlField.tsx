import { FC } from "react";

import { useFormContext } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Chip, MenuItem } from "@mui/material";

import { AttributeDto } from "@services/attributes";

import SelectFormField from "@components/ui/SelectFormField";

interface ListControlFieldProps {
  data: AttributeDto;
  index: number;
}

const ListControlField: FC<ListControlFieldProps> = ({ data, index }) => {
  const { getValues, setValue } = useFormContext();

  function deleteHandler(event: React.MouseEvent, id: number) {
    event.preventDefault();
    setValue(
      `properties.${index}.value`,
      getValues(`properties.${index}.value`).filter((item: number) => item !== id)
    );
  }

  return (
    <SelectFormField
      id={`attribute-${data.id}-value-select`}
      label="Значення характеристики"
      name={`properties.${index}.value`}
      required
      multiple
      variant="outlined"
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {(typeof selected === "string" ? selected.split(",") : selected).map(
            (value) => (
              <Chip
                key={value}
                label={data.values.find((value1) => value1.id === value).title}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
                onDelete={(event) => deleteHandler(event, value)}
              />
            )
          )}
        </Box>
      )}>
      {(data?.values ?? []).map((value: any) => (
        <MenuItem key={value.id} value={value.id}>
          {value.title}
        </MenuItem>
      ))}
    </SelectFormField>
  );
};

export default ListControlField;
