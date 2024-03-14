import { FC } from "react";

import { useFormContext } from "react-hook-form";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";

import "./ProductBasicInfo.scss";

interface ProductBasicInfoProps {
  hideRatingField?: boolean;
}

const ProductBasicInfo: FC<ProductBasicInfoProps> = ({
  hideRatingField = false,
}) => {
  const { trigger } = useFormContext();

  return (
    <ContentBox className="product-basic-info">
      <ContentBox.Header>
        <ContentBox.Title>Основна інформація</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="product-basic-info__content dg two-columns">
        <TextFormField name="name" label="Назва" required />
        <TextFormField name="slug" label="Slug" required />
        {!hideRatingField && (
          <TextFormField name="rating" label="Рейтинг" required type="number" />
        )}
        <div className="dg two-columns grid-gap20">
          <TextFormField name="price" label="Ціна" required type="number" />
          <TextFormField
            name="discountPrice"
            label="Акційна ціна"
            type="number"
            onChange={() => {
              trigger("price");
            }}
          />
        </div>
        <TextFormField name="sku" label="SKU" required />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default ProductBasicInfo;
