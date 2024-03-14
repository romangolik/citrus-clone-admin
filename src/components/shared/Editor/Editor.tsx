import React, { FC } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useController, useFormContext } from "react-hook-form";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

import { EDITOR_CONFIGURATION } from "./data/config";

import "./Editor.scss";

interface EditorProps {
  name: string;
  onChange?: (value: string) => void;
}

const Editor: FC<EditorProps> = ({ name, onChange }) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  function onChangeHandler(value: string) {
    field.onChange(value);
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={EDITOR_CONFIGURATION}
      data={field.value || ""}
      onChange={(event, editor) => onChangeHandler(editor.getData())}
    />
  );
};

export default Editor;
