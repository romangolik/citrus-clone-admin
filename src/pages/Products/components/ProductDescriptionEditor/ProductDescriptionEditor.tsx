import { FC } from "react";

import Editor from "@components/shared/Editor";
import ContentBox from "@components/ui/ContentBox";

import "./ProductDescriptionEditor.scss";

const ProductDescriptionEditor: FC = () => {
  return (
    <ContentBox className="product-description df fdc">
      <ContentBox.Header>
        <ContentBox.Title>Опис</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="product-description__editor">
        <Editor name="description" />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductDescriptionEditor;
