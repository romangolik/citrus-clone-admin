import NiceModal from "@ebay/nice-modal-react";

import InsertImageModal from "./InsertImageModal";
import ConfirmationModal from "./ConfirmationModal";
import ProductOptionModal from "./ProductOptionModal";
import AttributeGroupModal from "./AttributeGroupModal";
import ProductStickersModal from "./ProductStickersModal";
import ProductImagesSelectModal from "./ProductImagesSelectModal";
import ProductCharacteristicsSelectModal from "./ProductCharacteristicsSelectModal";

export enum Modals {
  ConfirmationModal = "ConfirmationModal",
  AttributeGroupModal = "AttributeGroupModal",
  ProductStickersModal = "ProductStickersModal",
  InsertImageModal = "InsertImageModal",
  ProductOptionModal = "ProductOptionModal",
  ProductImagesSelectModal = "ProductImagesSelectModal",
  ProductCharacteristicsSelectModal = "ProductCharacteristicsSelectModal",
}

NiceModal.register(Modals.ConfirmationModal, ConfirmationModal);
NiceModal.register(Modals.AttributeGroupModal, AttributeGroupModal);
NiceModal.register(Modals.ProductStickersModal, ProductStickersModal);
NiceModal.register(Modals.InsertImageModal, InsertImageModal);
NiceModal.register(Modals.ProductOptionModal, ProductOptionModal);
NiceModal.register(Modals.ProductImagesSelectModal, ProductImagesSelectModal);
NiceModal.register(Modals.ProductCharacteristicsSelectModal, ProductCharacteristicsSelectModal);