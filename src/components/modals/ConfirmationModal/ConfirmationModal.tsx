import React from "react";

import { Button } from "@mui/material";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import Modal from "@components/ui/Modal";

import mainIcom from "@assets/images/confirm-modal/main-icon.svg";

import "./ConfirmationModal.scss";

export interface ConfirmModalProps {
  message: string;
}

export default NiceModal.create(({ message }: ConfirmModalProps) => {
  const modal = useModal();

  function confirmHandler() {
    modal.resolve(true);
    modal.hide();
  }

  function closeHandler() {
    modal.hide();
    modal.resolve(false);
  }

  return (
    <Modal
      open={modal.visible}
      className="confirmation-modal"
      onClose={closeHandler}>
      <img
        alt="Main modal icon"
        className="confirmation-modal__icon"
        src={mainIcom}
      />
      <h3 className="confirmation-modal__title h4 medium-weight">{message}</h3>
      <Modal.Actions>
        <Button
          color="success"
          onClick={confirmHandler}>
          Так
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={closeHandler}>
          Ні
        </Button>
      </Modal.Actions>
    </Modal>
  );
});
