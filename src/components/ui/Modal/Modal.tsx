import React, { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import MuiModal from "@mui/material/Modal";

import Icon from "@components/ui/Icon";

import "./Modal.scss";

interface ModalSubcomponents {
  Actions: typeof ModalActions;
}

interface ModalBaseProps extends PropsWithChildren {
  open: boolean;
  title?: string;
  className?: string;
  onClose: () => void;
}

type ModalProps = FC<ModalBaseProps> & ModalSubcomponents;

const Modal: ModalProps = ({ open, title, children, className, onClose }) => {
  return (
    <MuiModal open={open} className="modal-container" onClose={onClose}>
      <div className={classNames("modal", className)}>
        <button className="modal__close-button" onClick={onClose}>
          <Icon name="cancel" className="modal__close-button-icon" />
        </button>
        {title ? (
          <h2 className="modal__title h4 medium-weight">{title}</h2>
        ) : null}
        {children}
      </div>
    </MuiModal>
  );
};

interface ModalActionsProps extends PropsWithChildren {
  className?: string;
}

const ModalActions: FC<ModalActionsProps> = ({ children, className }) => {
  return (
    <div className={classNames("modal__actions df aic jcfe gap20", className)}>
      {children}
    </div>
  );
};

Modal.Actions = ModalActions;

export default Modal;
