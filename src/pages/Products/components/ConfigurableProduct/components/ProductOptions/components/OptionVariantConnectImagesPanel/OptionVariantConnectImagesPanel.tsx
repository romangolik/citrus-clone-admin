import { FC, useState, useEffect } from "react";

import { Button } from "@mui/material";

import { ProductOptionDto, ShortProductImageDto } from "@services/products";

import ContentBox from "@components/ui/ContentBox";
import SlideoutPanel from "@components/ui/SlideoutPanel";
import OptionVariantImages from "./components/OptionVariantImages";

import "./OptionVariantConnectImagesPanel.scss";

interface OptionVariantConnectImagesPanelProps {
  open: boolean;
  data: {
    options: ProductOptionDto[];
    productImages: ShortProductImageDto[];
  };
  onClose: () => void;
  onSubmit: (options: ProductOptionDto[]) => void;
}

const OptionVariantConnectImagesPanel: FC<
  OptionVariantConnectImagesPanelProps
> = ({ open, data, onClose, onSubmit }) => {
  const [options, setOptions] = useState<ProductOptionDto[]>([]);

  useEffect(() => {
    if (data) {
      setOptions(data.options);
    }
  }, [data]);

  function closeHandler() {
    setOptions([]);
    onClose();
  }

  function submitHandler() {
    onSubmit(options);
    closeHandler();
  }

  function updateOptionValueImages(
    optionIndex: number,
    optionValueIndex: number,
    newOptionValueImages: number[]
  ) {
    setOptions(
      options.map((option, i) => {
        if (i === optionIndex) {
          return {
            ...option,
            values: option.values.map((optionValue, j) => {
              if (j === optionValueIndex) {
                return {
                  ...optionValue,
                  images: newOptionValueImages,
                };
              }

              return optionValue;
            }),
          };
        }
        return option;
      })
    );
  }

  return (
    <SlideoutPanel
      open={open}
      className="attribute-control-panel"
      onClose={closeHandler}>
      <SlideoutPanel.Header onClose={closeHandler}>
        Управління зображеннями варіантів опцій
      </SlideoutPanel.Header>
      <SlideoutPanel.Content>
        <div className="df fdc gap20">
          {options.map((option, optionIndex) => (
            <ContentBox key={option.name}>
              <ContentBox.Header>
                <ContentBox.Title>Опція: {option.name}</ContentBox.Title>
              </ContentBox.Header>
              <ContentBox.Content className="df fdc gap20">
                {option.values.map((optionValue, optionValueIndex) => (
                  <OptionVariantImages
                    key={optionValue.name}
                    data={optionValue}
                    productImages={data?.productImages ?? []}
                    onChange={(newOptionValueImages) =>
                      updateOptionValueImages(
                        optionIndex,
                        optionValueIndex,
                        newOptionValueImages
                      )
                    }
                  />
                ))}
              </ContentBox.Content>
            </ContentBox>
          ))}
        </div>
      </SlideoutPanel.Content>
      <SlideoutPanel.Actions>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Закрити
        </Button>
        <Button color="success" onClick={submitHandler}>
          Зберегти
        </Button>
      </SlideoutPanel.Actions>
    </SlideoutPanel>
  );
};

export default OptionVariantConnectImagesPanel;
