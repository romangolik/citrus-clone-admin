import { FC } from "react";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";

import "./CustomerAddress.scss";

const CustomerAddress: FC = () => {
  return (
    <ContentBox className="customer-address">
      <ContentBox.Header>
        <ContentBox.Title>Адреса</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="product-basic-info__content dg two-columns">
        <TextFormField name="city" label="Город" required />
        <TextFormField name="street" label="Вулиця" required />
        <TextFormField name="house" label="Дім" required />
        <TextFormField name="flat" label="Квартира" required />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default CustomerAddress;
