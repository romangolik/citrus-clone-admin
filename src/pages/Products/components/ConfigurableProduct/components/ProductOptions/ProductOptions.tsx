import React, { FC, useState } from "react";

import { Button } from "@mui/material";
import { toast } from "react-toastify";
import NiceModal from "@ebay/nice-modal-react";
import { useWatch, useFormContext } from "react-hook-form";

import { ProductOptionDto, ShortProductImageDto } from "@services/products";

import Icon from "@components/ui/Icon";
import { Modals } from "@components/modals";
import ContentBox from "@components/ui/ContentBox";
import ProductOption from "./components/ProductOption";
import SortableList from "@components/shared/SortableList";
import OptionVariantConnectImagesPanel from "./components/OptionVariantConnectImagesPanel";

import "./ProductOptions.scss";

export type ProductOptionsChangeReason =
  | "create"
  | "reorder"
  | "remove"
  | "update";

interface ProductOptionsProps {
  onChange?: (
    options: ProductOptionDto[],
    type: ProductOptionsChangeReason
  ) => void;
}

const ProductOptions: FC<ProductOptionsProps> = ({ onChange }) => {
  const { control, setValue, getValues } = useFormContext();
  const watchOptions: ProductOptionDto[] = useWatch({
    control,
    name: "options",
  });
  const [panelData, setPanelData] = useState<{
    options: ProductOptionDto[];
    productImages: ShortProductImageDto[];
  }>(null);
  const isPanelOpen = panelData !== null;

  function updateProductOptionsFormField(data: ProductOptionDto[]) {
    setValue("options", data, { shouldDirty: true });
  }

  function updateProductOptions(
    data: ProductOptionDto[],
    type: ProductOptionsChangeReason
  ) {
    updateProductOptionsFormField(data);
    onChange && onChange(data, type);
  }

  function checkOptionExistent(
    optionToCheck: ProductOptionDto,
    currentOptionIndex?: number
  ) {
    const optionInxed = watchOptions.findIndex(
      (option) => option.name === optionToCheck.name
    );

    const optionExists =
      optionInxed !== -1 && optionInxed !== currentOptionIndex;

    if (optionExists) {
      toast.info("Опція з даною назвою вже існує");
    }

    return optionExists;
  }

  function creatHandler() {
    NiceModal.show(Modals.ProductOptionModal).then(
      (result: ProductOptionDto) => {
        if (!checkOptionExistent(result)) {
          updateProductOptions([...watchOptions, result], "create");
        }
      }
    );
  }

  function openUpdateModal(index: number, data: ProductOptionDto) {
    NiceModal.show(Modals.ProductOptionModal, { data }).then(
      (result: ProductOptionDto) => {
        if (!checkOptionExistent(result, index)) {
          const updatedOptions = watchOptions.map((option, optionIndex) =>
            optionIndex === index ? result : option
          );
          updateProductOptions(updatedOptions, "update");
        }
      }
    );
  }

  function removeHandler(indexToRemove: number) {
    const filteredOptions = watchOptions.filter(
      (_, index) => indexToRemove !== index
    );
    updateProductOptions(filteredOptions, "remove");
  }

  function updateOptionsOrder(data: ProductOptionDto[]) {
    updateProductOptions(data, "reorder");
  }

  function openPanel() {
    setPanelData({
      options: getValues("options"),
      productImages: getValues("images"),
    });
  }

  function closePanel() {
    setPanelData(null);
  }

  return (
    <ContentBox className="product-options">
      <ContentBox.Header>
        <ContentBox.Title>Опції</ContentBox.Title>
        <div className="df aic gap10">
          {watchOptions.length > 0 && (
            <Button
              size="small"
              variant="text"
              color="success"
              startIcon={<Icon name="images-link" size="fill" />}
              onClick={openPanel}>
              Підключити зображення
            </Button>
          )}
          <Button
            size="small"
            color="success"
            startIcon={<Icon name="plus" size="fill" />}
            onClick={creatHandler}>
            Додати
          </Button>
        </div>
      </ContentBox.Header>
      {watchOptions.length > 0 && (
        <ContentBox.Content className="df fdc gap15">
          <SortableList
            handle
            vertical
            scrollable
            sortField="name"
            className="product-options__list"
            items={watchOptions}
            onChange={updateOptionsOrder}
            renderItem={({ index, value, ref, listeners, dragOverlay }) => (
              <ProductOption
                ref={ref as React.Ref<HTMLLIElement>}
                index={index}
                data={value}
                listeners={listeners}
                dragOverlay={dragOverlay}
                onRemove={removeHandler}
                onEdit={openUpdateModal}
              />
            )}
          />
        </ContentBox.Content>
      )}
      <OptionVariantConnectImagesPanel
        open={isPanelOpen}
        data={panelData}
        onClose={closePanel}
        onSubmit={updateProductOptionsFormField}
      />
    </ContentBox>
  );
};

export default ProductOptions;
