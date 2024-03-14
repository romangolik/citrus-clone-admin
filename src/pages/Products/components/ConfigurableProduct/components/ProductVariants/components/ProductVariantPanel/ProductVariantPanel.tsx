import { FC, useEffect } from "react";

import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";

import { ProductVariantDto } from "@services/products";

import ProductBasicInfo from "@pages/Products/components/ProductBasicInfo";

import SlideoutPanel from "@components/ui/SlideoutPanel";
import ProductVariantCharacteristics from "./components/ProductVariantCharacteristics";

import { PRODUCT_VARIANT_SCHEMA } from "@utils/validation-schemas/product.schemas";

import "./ProductVariantPanel.scss";

interface ProductVariantPanelProps {
  open: boolean;
  data: ProductVariantDto;
  onClose: () => void;
  onSubmit: (value: ProductVariantDto) => void;
}

const ProductVariantPanel: FC<ProductVariantPanelProps> = ({
  open,
  data,
  onClose,
  onSubmit,
}) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(PRODUCT_VARIANT_SCHEMA),
  });

  function closeHandler() {
    onClose();
  }

  function submitHandler(updatedVariant: ProductVariantDto) {
    onSubmit(updatedVariant);
    closeHandler();
  }

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return (
    <SlideoutPanel
      open={open}
      className="attribute-control-panel"
      onClose={closeHandler}>
      <SlideoutPanel.Header onClose={closeHandler}>
        Управління варіантом
      </SlideoutPanel.Header>
      <SlideoutPanel.Content>
        <FormProvider {...form}>
          <div className="df fdc gap20">
            <ProductBasicInfo />
            <ProductVariantCharacteristics />
          </div>
        </FormProvider>
      </SlideoutPanel.Content>
      <SlideoutPanel.Actions>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Закрити
        </Button>
        <Button color="success" onClick={form.handleSubmit(submitHandler)}>
          Зберегти
        </Button>
      </SlideoutPanel.Actions>
    </SlideoutPanel>
  );
};

export default ProductVariantPanel;
