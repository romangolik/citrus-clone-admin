import { FC } from "react";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";
import CategorySelect from "./components/CategorySelect";
import ProductStickersSelect from "./components/ProductStickersSelect";

interface ProductOrganizationProps {
  onCategoryChange?: (id: number) => void;
}

const ProductOrganization: FC<ProductOrganizationProps> = ({
  onCategoryChange,
}) => {
  function categoryChangeHandler(categoryId: number) {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  }

  return (
    <ContentBox>
      <ContentBox.Header>
        <ContentBox.Title>Організація продукту</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="df fdc gap15">
        <CategorySelect onChange={categoryChangeHandler} />
        <TextFormField
          name="warranty"
          label="Гарантія"
          required
          type="number"
        />
        <ProductStickersSelect />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductOrganization;
