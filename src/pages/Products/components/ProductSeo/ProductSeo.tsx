import { FC } from "react";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";

const ProductSeo: FC = () => {
  return (
    <ContentBox>
      <ContentBox.Header>
        <ContentBox.Title>SEO</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="df fdc gap15">
        <TextFormField name="metaKeywords" label="Ключові слова" fullWidth />
        <TextFormField
          name="metaDescription"
          label="Метаопис"
          fullWidth
          multiline
          rows={7}
        />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductSeo;
