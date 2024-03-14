import { FC } from "react";

import { Checkbox, ListItemIcon, ListItemButton } from "@mui/material";

import { StickerDto } from "@services/stickers";

import "./StickerItem.scss";

interface StickerItemProps {
  data: StickerDto;
  checked: boolean;
  onClick: () => void;
}

const StickerItem: FC<StickerItemProps> = ({ data, checked, onClick }) => {
  return (
    <ListItemButton
      component="li"
      className="sticker-item df aic"
      onClick={onClick}>
      <ListItemIcon>
        <Checkbox checked={checked} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <img src={data.image} alt={data.title} className="sticker-item__image" />
      <p className="sticker-item__name">{data.title}</p>
    </ListItemButton>
  );
};

export default StickerItem;
