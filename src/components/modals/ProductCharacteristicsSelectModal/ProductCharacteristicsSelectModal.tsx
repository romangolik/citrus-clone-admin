import { useState } from "react";

import { Button } from "@mui/material";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { AttributeDto } from "@services/attributes";

import Modal from "@components/ui/Modal";
import { BaseTable } from "@components/layout/Table";

import { TABLE_COLUMNS } from "./data/table-columns";

import "./ProductCharacteristicsSelectModal.scss";

interface ProductCharacteristicsSelectModalProps {
  availableAttributes: AttributeDto[];
  productProperties: AttributeDto[];
}

export default NiceModal.create(
  ({
    availableAttributes,
    productProperties,
  }: ProductCharacteristicsSelectModalProps) => {
    const modal = useModal();
    const [selectedAttributes, setSelectedAttributes] = useState<
      AttributeDto[]
    >(productProperties ?? []);

    function submitHandler() {
      modal.resolve(selectedAttributes);
      modal.remove();
    }

    function closeHandler() {
      modal.remove();
    }

    function selectAttributes(selectedData: AttributeDto[]) {
      setSelectedAttributes(selectedData);
    }

    return (
      <Modal
        open={modal.visible}
        title="Вибір загальних характеристик"
        className="product-characteristics-select-modal"
        onClose={closeHandler}>
        <BaseTable
          selecting
          data={availableAttributes}
          columns={TABLE_COLUMNS}
          selectedData={selectedAttributes}
          className="product-characteristics-select-modal__table"
          onSelectChange={selectAttributes}
        />
        <Modal.Actions>
          <Button variant="outlined" color="success" onClick={closeHandler}>
            Відмінити
          </Button>
          <Button color="success" type="submit" onClick={submitHandler}>
            Зберегти
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
);
