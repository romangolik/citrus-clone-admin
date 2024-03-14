import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import {
  ProductOptionDto,
  ProductOptionType,
  ProductOptionValueDto,
} from "@services/products";

import Modal from "@components/ui/Modal";
import OptionType from "./components/OptionType";
import TextFormField from "@components/ui/TextFormField";
import OptionVariants from "./components/OptionVariants";

import { PRODUCT_OPTION_SCHEMA } from "@utils/validation-schemas/product.schemas";

import "./ProductOptionModal.scss";

interface ProductOptionModalProps {
  data: ProductOptionDto;
}

const DEFAULT_FORM_STATE = {
  name: "",
  type: ProductOptionType.MODIFICATION,
  values: [],
} as ProductOptionDto;

export default NiceModal.create(({ data }: ProductOptionModalProps) => {
  const modal = useModal();
  const form = useForm({
    mode: "onChange",
    defaultValues: data ?? DEFAULT_FORM_STATE,
    resolver: yupResolver(PRODUCT_OPTION_SCHEMA),
  });

  function submitHandler(formData: ProductOptionDto) {
    modal.resolve(formData);
    modal.remove();
  }

  function closeHandler() {
    modal.remove();
  }

  function optionTypeChangeHandler(type: ProductOptionType) {
    const isColorOption = type === ProductOptionType.COLOR;
    form.setValue(
      "values",
      form.getValues("values").map((item: ProductOptionValueDto) => ({
        ...item,
        value: isColorOption ? "#000000" : item.name,
      })),
      { shouldDirty: true }
    );
  }

  return (
    <Modal
      open={modal.visible}
      title={data ? "Редагування опції товару" : "Додавання опції товару"}
      className="product-option-modal"
      onClose={closeHandler}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="df fdc gap30">
            <div className="df gap30">
              <TextFormField
                className="product-option-modal__option-name"
                name="name"
                label="Назва опції"
                fullWidth
              />
              <OptionType onChange={optionTypeChangeHandler} />
            </div>
            <OptionVariants />
          </div>
          <Modal.Actions>
            <Button variant="outlined" color="success" onClick={closeHandler}>
              Відмінити
            </Button>
            <Button color="success" type="submit">
              Зберегти
            </Button>
          </Modal.Actions>
        </form>
      </FormProvider>
    </Modal>
  );
});
