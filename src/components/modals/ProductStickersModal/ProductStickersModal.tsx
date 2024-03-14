import { useState, useEffect } from "react";

import { Button } from "@mui/material";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { StickerDto, stickersService } from "@services/stickers";

import Modal from "@components/ui/Modal";
import StickerItem from "./components/StickerItem";
import StickersContainer from "./components/StickersContainer";

import "./ProductStickersModal.scss";

interface ProductStickersModalProps {
  data: StickerDto[];
}

function not(a: StickerDto[], b: StickerDto[]) {
  return a.filter(
    (value) => b.findIndex((sticker) => sticker.id === value.id) === -1
  );
}

function intersection(a: StickerDto[], b: StickerDto[]) {
  return a.filter(
    (value) => b.findIndex((sticker) => sticker.id === value.id) !== -1
  );
}

export default NiceModal.create(
  ({ data }: ProductStickersModalProps) => {
    const modal = useModal();
    const { data: stickers } = stickersService.useGetAllStickersQuery(null, {
      refetchOnMountOrArgChange: false,
    });

    const [checked, setChecked] = useState<StickerDto[]>([]);
    const [availableStickers, setAvailableStickers] = useState<StickerDto[]>(
      []
    );
    const [productStickers, setProductStickers] = useState<StickerDto[]>([]);
    const leftChecked = intersection(checked, availableStickers);
    const rightChecked = intersection(checked, productStickers);

    function confirmHandler() {
      modal.resolve(productStickers);
      modal.hide();
    }

    function closeHandler() {
      modal.hide();
    }

    function handleToggle(value: StickerDto) {
      return () => {
        const currentIndex = checked.findIndex(
          (sticker) => sticker.id === value.id
        );
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
      };
    }

    function handleAllRight() {
      setProductStickers(productStickers.concat(availableStickers));
      setAvailableStickers([]);
    };

    function handleCheckedRight() {
      setProductStickers(productStickers.concat(leftChecked));
      setAvailableStickers(not(availableStickers, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    function handleCheckedLeft() {
      setAvailableStickers(availableStickers.concat(rightChecked));
      setProductStickers(not(productStickers, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    function handleAllLeft() {
      setAvailableStickers(availableStickers.concat(productStickers));
      setProductStickers([]);
    };

    function isChecked(value: StickerDto) {
      return checked.findIndex((sticker) => value.id === sticker.id) !== -1;
    }

    useEffect(() => {
      if (stickers) {
        const availableStickers: StickerDto[] = [];
        const productStickers: StickerDto[] = [];

        stickers.forEach((sticker) => {
          if (data.find((productSticker) => sticker.id === productSticker.id)) {
            productStickers.push(sticker);
          } else {
            availableStickers.push(sticker);
          }
        });

        setAvailableStickers(availableStickers);
        setProductStickers(productStickers);
      }
    }, [stickers, data]);

    return (
      <Modal
        open={modal.visible}
        title="Управління стікерами продукта"
        className="product-stickers-modal"
        onClose={closeHandler}>
        <div className="df jcsb gap20">
          <StickersContainer label="Доступні стікери">
            {availableStickers.map((sticker) => (
              <StickerItem
                key={sticker.id}
                data={sticker}
                checked={isChecked(sticker)}
                onClick={handleToggle(sticker)}
              />
            ))}
          </StickersContainer>
          <div className="product-stickers-modal__buttons df fdc jcc gap10">
            <Button
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={availableStickers.length === 0}>
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}>
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}>
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={productStickers.length === 0}>
              ≪
            </Button>
          </div>
          <StickersContainer label="Стікери продукта">
            {productStickers.map((sticker) => (
              <StickerItem
                key={sticker.id}
                data={sticker}
                checked={isChecked(sticker)}
                onClick={handleToggle(sticker)}
              />
            ))}
          </StickersContainer>
        </div>
        <Modal.Actions>
          <Button color="success" onClick={confirmHandler}>
            Так
          </Button>
          <Button variant="outlined" color="success" onClick={closeHandler}>
            Ні
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
);
