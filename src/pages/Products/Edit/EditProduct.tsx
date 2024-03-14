import { FC, useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { ProductDto, ProductType, productsService } from "@services/products";

import SimpleProduct from "../components/SimpleProduct";
import ConfigurableProduct from "../components/ConfigurableProduct";

import { Routes } from "@router/routes";

import "./EditProduct.scss";

const EditProduct: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductDto>(null);
  const [getProduct, { isLoading }] = productsService.useLazyGetProductQuery();

  useEffect(() => {
    if (id) {
      getProduct(+id)
        .unwrap()
        .then(setProductData)
        .catch(() => {
          navigate(Routes.products())
        });
    }
  }, [getProduct, id, navigate]);

  if (isLoading || !productData) {
    return <div>Loading...</div>
  }

  if (productData.type === ProductType.SIMPLE) {
    return <SimpleProduct productData={productData} />;
  }

  return <ConfigurableProduct productData={productData} />;
};

export default EditProduct;
