import { FC } from "react";

import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import {
  ProductType,
  productsService,
  SimpleProductDto,
  AvailabilityStatus,
} from "@services/products";

import Link from "@components/ui/Link";
import Icon from "@components/ui/Icon";
import Switch from "@components/ui/Switch";
import ProductSeo from "../../components/ProductSeo";
import PageLayout from "@components/layout/PageLayout";
import ProductImages from "../../components/ProductImages";
import ProductStatus from "../../components/ProductStatus";
import ProductBasicInfo from "../../components/ProductBasicInfo";
import ProductOrganization from "../../components/ProductOrganization";
import ProductDescriptionEditor from "../../components/ProductDescriptionEditor";
import SimpleProductCharacteristics from "./components/SimpleProductCharacteristics";

import { Routes } from "@router/routes";

import { SIMPLE_PRODUCT_SCHEMA } from "@utils/validation-schemas/product.schemas";

interface SimpleProductProps {
  productData?: SimpleProductDto;
}

const DEFAULT_SIMPLE_PRODUCT_DATA: SimpleProductDto = {
  published: false,
  name: "",
  slug: "",
  type: ProductType.SIMPLE,
  price: null,
  discountPrice: null,
  description: "",
  categoryId: null,
  sku: "",
  rating: null,
  warranty: null,
  status: AvailabilityStatus.UNAVAILABLE,
  stickers: [],
  images: [],
  properties: [],
  metaDescription: "",
  metaKeywords: "",
};

const SimpleProduct: FC<SimpleProductProps> = ({ productData }) => {
  const isCreateMode = !productData;

  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    defaultValues: isCreateMode ? DEFAULT_SIMPLE_PRODUCT_DATA : productData,
    resolver: yupResolver(SIMPLE_PRODUCT_SCHEMA),
  });

  const [createProduct, { isLoading: isCreating }] =
    productsService.useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    productsService.useUpdateProductMutation();

  function onSubmitHandler(data: SimpleProductDto) {
    if (isCreateMode) {
      createProduct(data)
        .unwrap()
        .then((product) => navigate(Routes.editProduct(product.id)))
        .catch(console.error);
    } else {
      updateProduct(data).unwrap().catch(console.error);
    }
  }

  function onInvalidSubmitHandler(fields: any) {
    if (fields.images) {
      toast.info(fields.images.message);
    }
    if (fields.properties) {
      toast.info("Перегляньте блок характеристик");
    }
  }

  return (
    <FormProvider {...form}>
      <PageLayout className="product-page">
        <PageLayout.Header className="aic">
          <Link to={Routes.products()} startIcon={<Icon name="back-arrow" />}>
            Список продуктів
          </Link>
          <div className="df aic gap30">
            <div className="product-page__switch df aic gap10">
              Опублікувати
              <Switch name="published" />
            </div>
            <LoadingButton
              color="success"
              variant="contained"
              loading={isCreating || isUpdating}
              loadingPosition="start"
              startIcon={<Icon name="save" size="fill" />}
              onClick={form.handleSubmit(
                onSubmitHandler,
                onInvalidSubmitHandler
              )}>
              Зберегти
            </LoadingButton>
          </div>
        </PageLayout.Header>
        <PageLayout.Content className="product-page__content grid-gap30">
          <div className="product-page__left-part df fdc gap30">
            <ProductBasicInfo />
            <ProductDescriptionEditor />
            <ProductImages />
            <SimpleProductCharacteristics />
            <ProductSeo />
          </div>
          <div className="product-page__right-part df fdc gap30">
            <ProductStatus />
            <ProductOrganization />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </FormProvider>
  );
};

export default SimpleProduct;
