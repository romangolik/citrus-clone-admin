import { FC, useRef, useState } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { ProductVariantDto } from "@services/products";

import ContentBox from "@components/ui/ContentBox";
import ProductVariantItem from "./components/ProductVariantItem";
import ProductVariantPanel from "./components/ProductVariantPanel";

import "./ProductVariants.scss";

const ProductVariants: FC = () => {
  const { control, getValues } = useFormContext();
  const { fields, update } = useFieldArray({
    control,
    name: "variants",
  });
  const [panelData, setPanelData] = useState<ProductVariantDto>(null);
  const isPanelOpen = panelData !== null;
  const productVariantIndex = useRef<number>(null);

  function openPanel(index: number) {
    setPanelData(getValues(`variants.${index}`));
    productVariantIndex.current = index;
  }

  function closePanel() {
    setPanelData(null);
  }

  function updateVariant(data: ProductVariantDto) {
    update(productVariantIndex.current, data);
    productVariantIndex.current = null;
  }

  if (fields.length === 0) {
    return null;
  }

  return (
    <ContentBox className="product-variants">
      <ContentBox.Header>
        <ContentBox.Title>Варіанти</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content>
        <ul>
          {fields.map((variant, index) => (
            <ProductVariantItem
              key={variant.id}
              index={index}
              onEdit={openPanel}
            />
          ))}
        </ul>
      </ContentBox.Content>
      <ProductVariantPanel
        open={isPanelOpen}
        data={panelData}
        onClose={closePanel}
        onSubmit={updateVariant}
      />
    </ContentBox>
  );
};

export default ProductVariants;
