import { FC } from "react";

import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import Icon from "@components/ui/Icon";
import Link from "@components/ui/Link";
import Switch from "@components/ui/Switch";
import ContentBox from "@components/ui/ContentBox";
import PageLayout from "@components/layout/PageLayout";
import CustomerDetails from "./components/CustomerDetails";
import CustomerAddress from "./components/CustomerAddress";

import { Routes } from "@router/routes";

import "./CreateCustomer.scss";

const DEFAULT_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const CreateCustomer: FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_FORM_STATE,
  });

  function onSubmitHandler(data: any) {
    console.log(data);
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="create-customer-page">
        <PageLayout.Header className="aic">
          <Link to={Routes.customers()} startIcon={<Icon name="back-arrow" />}>
            Список клієнтів
          </Link>
          <LoadingButton
            color="success"
            variant="contained"
            loading={false}
            loadingPosition="start"
            startIcon={<Icon name="save" size="fill" />}
            onClick={form.handleSubmit(onSubmitHandler)}>
            Зберегти
          </LoadingButton>
        </PageLayout.Header>
        <PageLayout.Content className="create-customer-page__content">
          <CustomerDetails />
          <CustomerAddress />
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default CreateCustomer;
