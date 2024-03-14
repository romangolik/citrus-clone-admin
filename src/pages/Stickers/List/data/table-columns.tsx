import { StickerDto } from "@services/stickers";

import Link from "@components/ui/Link";
import { Column } from "@components/layout/Table";

import { Routes } from "@router/routes";

export const TABLE_COLUMNS: Column<StickerDto>[] = [
  {
    id: "image",
    label: "Зображ.",
    type: "image",
    renderColumn: (sticker) => <img src={sticker.image} alt={sticker.title} />,
  },
  {
    id: "title",
    label: "Назва",
    sort: true,
    renderColumn: (sticker) => (
      <Link
        to={Routes.editSticker(sticker.id)}
        variant="dashed"
        className="link link-dashed">
        {sticker.title}
      </Link>
    ),
  }
];
