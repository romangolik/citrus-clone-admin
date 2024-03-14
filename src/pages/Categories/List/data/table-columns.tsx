import { ShortCategoryDto } from "@services/categories";

import Link from "@components/ui/Link";
import { Column } from "@components/layout/Table";
import CategoryType from "../components/CategoryType";
import BulletedText from "@components/ui/BulletedText";

import { Routes } from "@router/routes";

export const TABLE_COLUMNS: Column<ShortCategoryDto>[] = [
  {
    id: "image",
    label: "Зображ.",
    type: "image",
    renderColumn: (category) => <img src={category.image} alt={category.name} />,
  },
  {
    id: "name",
    label: "Назва",
    sort: true,
    renderColumn: (category) => (
      <Link
        to={Routes.editCategory(category.id)}
        variant="dashed"
        className="link link-dashed">
        {category.name}
      </Link>
    ),
  },
  {
    id: "type",
    label: "Тип",
    renderColumn: (category) => <CategoryType type={category.type} />,
  },
  {
    id: "published",
    label: "Статус",
    renderColumn: (category) => (
      <BulletedText
        color={category.published ? "success" : "primary"}
        text={category.published ? "Опублікована" : "Не опублікована"}
      />
    ),
  },
];
