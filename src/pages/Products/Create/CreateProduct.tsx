import { FC } from "react";

import { Navigate } from "react-router-dom";

import { ProductType } from "@services/products";

import SimpleProduct from "../components/SimpleProduct";
import ConfigurableProduct from "../components/ConfigurableProduct";

import { Routes } from "@router/routes";

import { useQueryParams } from "@utils/hooks/useQueryParams";

import "./CreateProduct.scss";

const CreateProduct: FC = () => {
  const queryParams = useQueryParams();
  const productType = queryParams.get("type") as ProductType;

  if (!productType) {
    return <Navigate to={Routes.products()} replace />;
  }

  if (productType === ProductType.SIMPLE) {
    return <SimpleProduct />;
  }

  return <ConfigurableProduct />;
};

export default CreateProduct;
