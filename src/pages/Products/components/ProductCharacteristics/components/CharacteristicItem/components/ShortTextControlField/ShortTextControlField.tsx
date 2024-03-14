import { FC } from "react";

import TextFormField from "@components/ui/TextFormField";

interface ShortTextControlFieldProps {
  index: number;
}

const ShortTextControlField: FC<ShortTextControlFieldProps> = ({ index }) => {
  return (
    <TextFormField
      label="Значення характеристики"
      name={`properties.${index}.value`}
      required
      variant="outlined"
    />
  );
};

export default ShortTextControlField;
