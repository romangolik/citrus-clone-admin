import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { AttributeGroupDto } from "@services/attribute-groups";

import Modal from "@components/ui/Modal";
import TextFormField from "@components/ui/TextFormField";

const DEFAULT_FORM_STATE = {
  name: ""
};

interface AttributeGroupModalProps {
  name: string;
}

export default NiceModal.create((data?: AttributeGroupModalProps) => {
  const modal = useModal();
  const form = useForm({
    mode: "onChange",
    defaultValues: data ?? DEFAULT_FORM_STATE,
  });
  const isCreateMode = !data || Object.keys(data).length === 0;

  function onCloseHandler() {
    modal.remove();
  }

  function onSubmitHandler(formData: AttributeGroupDto) {
    modal.resolve(formData);
    modal.remove();
  }

  return (
    <Modal
      className="attribute-group-modal"
      open={modal.visible}
      title={isCreateMode ? "Створити групу" : "Оновити групу"}
      onClose={onCloseHandler}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <TextFormField name="name" label="Назва" fullWidth />
          <Modal.Actions>
            <Button
              type="submit"
              color="success">
              {isCreateMode ? "Створити" : "Оновити"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={onCloseHandler}>
              Закрити
            </Button>
          </Modal.Actions>
        </form>
      </FormProvider>
    </Modal>
  );
});
