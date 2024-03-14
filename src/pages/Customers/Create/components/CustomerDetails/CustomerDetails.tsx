import { FC } from "react";

import ContentBox from "@components/ui/ContentBox";
import TextFormField from "@components/ui/TextFormField";
import PhoneFormField from "@components/ui/PhoneFormField";

import "./CustomerDetails.scss";

const CustomerDetails: FC = () => {
  return (
    <ContentBox className="customer-details">
      <ContentBox.Header>
        <ContentBox.Title>Основна інформація</ContentBox.Title>
      </ContentBox.Header>
      <ContentBox.Content className="product-basic-info__content dg two-columns">
        <TextFormField name="firstName" label="Ім'я" required />
        <TextFormField name="lastName" label="Прізвище" required />
        <TextFormField name="email" label="Email" required />
        <PhoneFormField />
      </ContentBox.Content>
    </ContentBox>
  );
};

export default CustomerDetails;
