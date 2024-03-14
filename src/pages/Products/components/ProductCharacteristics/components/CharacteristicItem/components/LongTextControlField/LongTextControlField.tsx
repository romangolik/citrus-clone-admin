import { FC } from "react";

import TextFormField from "@components/ui/TextFormField";

interface LongTextControlFieldProps {
  index: number;
}

const LongTextControlField: FC<LongTextControlFieldProps> = ({ index }) => {
  return (
    <TextFormField
      label="Значення характеристики"
      name={`properties.${index}.value`}
      required
      variant="outlined"
      multiline
      minRows={3}
      maxRows={10}
    />
  );
};

export default LongTextControlField;
