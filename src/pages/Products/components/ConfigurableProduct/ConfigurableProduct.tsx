import { FC, useRef, useEffect } from "react";

import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { AttributeDto, attributesService } from "@services/attributes";
import {
  ProductType,
  productsService,
  ProductOptionDto,
  ProductProperyDto,
  ProductVariantDto,
  AvailabilityStatus,
  ConfigurableProductDto,
} from "@services/products";

import Link from "@components/ui/Link";
import Icon from "@components/ui/Icon";
import Switch from "@components/ui/Switch";
import ProductSeo from "../../components/ProductSeo";
import PageLayout from "@components/layout/PageLayout";
import ProductImages from "../../components/ProductImages";
import ProductVariants from "./components/ProductVariants";
import ProductBasicInfo from "../../components/ProductBasicInfo";
import ProductOrganization from "../../components/ProductOrganization";
import ProductDescriptionEditor from "../../components/ProductDescriptionEditor";
import ProductOptions, {
  ProductOptionsChangeReason,
} from "./components/ProductOptions";
import ConfigurableProductCharacteristics from "./components/ConfigurableProductCharacteristics";

import { Routes } from "@router/routes";

import { ConfigurableProductProvider } from "./context";

import { arrayToMap } from "@utils/helpers/arrayToMap";
import { mapToArray } from "@utils/helpers/mapToArray";
import { fillAttributes } from "@utils/helpers/fillAttributes";
import { generateVariants } from "./utils/helpers/generateVariants";
import { CONFIGURABLE_PRODUCT_SCHEMA } from "@utils/validation-schemas/product.schemas";

interface ConfigurableProductProps {
  productData?: ConfigurableProductDto;
}

const DEFAULT_CONFIGURABLE_PRODUCT_DATA: ConfigurableProductDto = {
  published: false,
  name: null,
  slug: null,
  type: ProductType.CONFIGURABLE,
  price: null,
  sku: "",
  discountPrice: null,
  description: "",
  categoryId: null,
  warranty: null,
  stickers: [],
  images: [],
  properties: [],
  options: [],
  variants: [],
  metaDescription: "",
  metaKeywords: "",
};

const ConfigurableProduct: FC<ConfigurableProductProps> = ({ productData }) => {
  const isCreateMode = !productData;

  const navigate = useNavigate();
  const attributesHashMap = useRef<Map<number, AttributeDto>>(new Map());
  const form = useForm({
    mode: "onChange",
    defaultValues: isCreateMode
      ? DEFAULT_CONFIGURABLE_PRODUCT_DATA
      : productData,
    resolver: yupResolver(CONFIGURABLE_PRODUCT_SCHEMA),
  });
  const [getAttributes] =
    attributesService.useLazyGetAllAttributesByCategoryQuery({
      selectFromResult: () => undefined,
    });
  const [createProduct, { isLoading: isCreating }] =
    productsService.useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    productsService.useUpdateProductMutation();

  function onSubmitHandler(data: ConfigurableProductDto) {
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
      return;
    }
    if (fields.properties) {
      toast.info("Перегляньте блок характеристик");
    }
    if (fields.options) {
      toast.info(fields.options.message);
      return;
    }
    if (fields.variants) {
      toast.info("Дані пов'язані з варіантами є невалідними");
      return;
    }
    toast.info("Дані є невалідними, перегляньте коректність заповнених даних");
  }

  function setAttributes(attributes: AttributeDto[]) {
    attributesHashMap.current = arrayToMap(
      attributes,
      (attribute) => attribute.id
    );
  }

  function getAttributesAsArray() {
    return mapToArray(attributesHashMap.current);
  }

  function getAttributesAsHashMap() {
    return attributesHashMap.current;
  }

  function removeProductImageHandler(id: number) {
    const productOptions: ProductOptionDto[] = form.getValues("options");
    if (productOptions.length > 0) {
      form.setValue(
        "options",
        productOptions.map((productOption) => ({
          ...productOption,
          values: productOption.values.map((productOptionValue) => ({
            ...productOptionValue,
            images: productOptionValue.images.filter(
              (productOptionValueImageId) => productOptionValueImageId !== id
            ),
          })),
        })),
        { shouldDirty: true }
      );
    }
  }

  function fillProductProperies(
    attributes: AttributeDto[],
    createNonExistentProperty: boolean
  ) {
    const filledProperties = fillAttributes(
      attributes,
      form.getValues("properties"),
      createNonExistentProperty
    );
    form.setValue("properties", filledProperties, { shouldDirty: true });

    return filledProperties;
  }

  function fillProductVariantsProperties(attributes: AttributeDto[]) {
    const variants = form.getValues("variants");
    if (variants.length > 0) {
      form.setValue(
        "variants",
        variants.map((variant) => ({
          ...variant,
          properties: fillAttributes(attributes, variant.properties),
        })),
        { shouldDirty: true }
      );
    }
  }

  function getProductVariantsAttributes(
    baseProductProperties: ProductProperyDto[]
  ) {
    const filledBasePropertyIds = baseProductProperties.map(
      (item) => item.attributeId
    );
    return getAttributesAsArray().filter(
      (attribute) => !filledBasePropertyIds.includes(attribute.id)
    );
  }

  function changePropductPropertiesHandler(attributes: AttributeDto[]) {
    const filledBaseProperties = fillProductProperies(attributes, true);
    fillProductVariantsProperties(
      getProductVariantsAttributes(filledBaseProperties)
    );
  }

  function updateAllPropertiesByCategoryAttributes(categoryId: number) {
    getAttributes(categoryId)
      .unwrap()
      .then((attributes) => {
        setAttributes(attributes);
        const filledBaseProperties = fillProductProperies(attributes, false);
        fillProductVariantsProperties(
          getProductVariantsAttributes(filledBaseProperties)
        );
      })
      .catch(console.error);
  }

  function categoryChangeHandler(categoryId: number) {
    updateAllPropertiesByCategoryAttributes(categoryId);
  }

  function getDefaultProductVariantData(): ProductVariantDto {
    const baseProductAttributeIds = form
      .getValues("properties")
      .map((item) => item.attributeId);
    const defaultVariantProperties = getAttributesAsArray().reduce(
      (variantProperties, attribute) => {
        if (baseProductAttributeIds.includes(attribute.id)) {
          return variantProperties;
        }

        return [
          ...variantProperties,
          {
            attributeId: attribute.id,
            value: null,
          },
        ];
      },
      []
    );

    return {
      name: form.getValues("name") ?? "",
      slug: form.getValues("slug") ?? "",
      price: form.getValues("price") ?? null,
      discountPrice: form.getValues("discountPrice") ?? null,
      rating: null,
      optionValues: [],
      properties: defaultVariantProperties,
      status: AvailabilityStatus.UNAVAILABLE,
    };
  }

  function productOptionsChangeHandler(
    options: ProductOptionDto[],
    reason: ProductOptionsChangeReason
  ) {
    const generatedVariants = generateVariants({
      newVariantDefaultData: getDefaultProductVariantData(),
      oldVariants: form.getValues("variants"),
      options,
      reOrder: reason === "reorder",
    });

    form.setValue("variants", generatedVariants, {
      shouldDirty: true,
    });
  }

  useEffect(() => {
    const categoryId = form.getValues("categoryId");
    if (categoryId) {
      updateAllPropertiesByCategoryAttributes(categoryId);
    }
  }, []);

  return (
    <ConfigurableProductProvider
      setAttributes={setAttributes}
      getAttributesAsArray={getAttributesAsArray}
      getAttributesAsHashMap={getAttributesAsHashMap}>
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
              <ProductBasicInfo hideRatingField />
              <ProductDescriptionEditor />
              <ProductImages onRemove={removeProductImageHandler} />
              <ConfigurableProductCharacteristics
                onChange={changePropductPropertiesHandler}
              />
              <ProductOptions onChange={productOptionsChangeHandler} />
              <ProductVariants />
              <ProductSeo />
            </div>
            <div className="product-page__right-part df fdc gap30">
              <ProductOrganization onCategoryChange={categoryChangeHandler} />
            </div>
          </PageLayout.Content>
        </PageLayout>
      </FormProvider>
    </ConfigurableProductProvider>
  );
};

export default ConfigurableProduct;
