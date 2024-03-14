import { FC, useEffect } from "react";

import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, FormProvider } from "react-hook-form";

import {
  AttributeDto,
  AttributeType,
  attributesService,
  AttributeValueDto,
  CreateAttributeDto,
  UpdateAttributeDto,
} from "@services/attributes";

import AttributeInfo from "./components/AttributeInfo";
import SlideoutPanel from "@components/ui/SlideoutPanel";
import AttributeValues from "./components/AttributeValues";

import { ATTRIBUTE_SCHEMA } from "@utils/validation-schemas/attribute.schemas";

const CREATE_ATTRIBUTE_STATE: Omit<CreateAttributeDto, "categoryId"> = {
  name: "",
  slug: "",
  type: AttributeType.COMBOBOX,
  comparable: false,
  active: false,
  isMain: false,
  attributeGroupId: null,
  values: [{ title: "", slug: "", isFilter: false }],
};

interface AttributeControlPanelProps {
  open: boolean;
  data?: AttributeDto | CreateAttributeDto;
  onClose: () => void;
}

//TODO: спробувати оптимізувати
const AttributeControlPanel: FC<AttributeControlPanelProps> = ({
  data,
  open,
  onClose,
}) => {
  const isCreateMode = !data || Object.keys(data).length === 0;

  const { id } = useParams();
  const categoryId = +id;
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(ATTRIBUTE_SCHEMA),
  });
  const attributeType = useWatch({
    control: form.control,
    name: "type",
    defaultValue: form.getValues("type"),
  });
  const isTextAttribute =
    attributeType === AttributeType.SHORT_TEXT ||
    attributeType === AttributeType.LONG_TEXT;

  const [createAttribute, { isLoading: isCreating }] =
    attributesService.useCreateAttributeMutation();
  const [updateAttribute, { isLoading: isUpdating }] =
    attributesService.useUpdateAttributeMutation();

  function closeHandler() {
    onClose();
    form.reset();
  }

  async function createAttributeHandler(data: CreateAttributeDto) {
    createAttribute({
      ...data,
      categoryId,
    })
      .unwrap()
      .then(() => closeHandler())
      .catch(console.error);
  }

  async function updateAttributeHandler(data: UpdateAttributeDto) {
    updateAttribute(data)
      .unwrap()
      .then(() => closeHandler())
      .catch(console.error);
  }

  function chageAttributeTypeHandler(type: AttributeType) {
    const attributeValues = form.getValues("values");
    if (type === AttributeType.LONG_TEXT || type === AttributeType.SHORT_TEXT) {
      form.setValue("values", [], { shouldDirty: true });
      form.setValue("comparable", false);
    } else {
      if (attributeValues.length === 0) {
        form.setValue("values", [{ title: "", slug: "", isFilter: false }], {
          shouldDirty: true,
        });
      }
    }
  }

  function chageComparableHandler(checked: boolean) {
    if (!checked) {
      form.setValue(
        "values",
        form.getValues("values").map((item: AttributeValueDto) => ({
          ...item,
          isFilter: false,
        })),
        { shouldDirty: true }
      );
    }
  }

  useEffect(() => {
    if (open) {
      form.reset(isCreateMode ? CREATE_ATTRIBUTE_STATE : data);
    }
  }, [open]);

  return (
    <SlideoutPanel
      open={open}
      className="attribute-control-panel"
      onClose={closeHandler}>
      <SlideoutPanel.Header onClose={closeHandler}>
        {isCreateMode ? "Створити атрибут" : "Оновити атрибут"}
      </SlideoutPanel.Header>
      <SlideoutPanel.Content>
        <FormProvider {...form}>
          <AttributeInfo
            comparableFieldHidden={isTextAttribute}
            onTypeChange={chageAttributeTypeHandler}
            onComparableChange={chageComparableHandler}
          />
          {!isTextAttribute && <AttributeValues />}
        </FormProvider>
      </SlideoutPanel.Content>
      <SlideoutPanel.Actions>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Закрити
        </Button>
        <LoadingButton
          color="success"
          variant="contained"
          loading={isCreating || isUpdating}
          onClick={form.handleSubmit(
            isCreateMode ? createAttributeHandler : updateAttributeHandler
          )}>
          {isCreateMode ? "Створити" : "Оновити"}
        </LoadingButton>
      </SlideoutPanel.Actions>
    </SlideoutPanel>
  );
};

export default AttributeControlPanel;
