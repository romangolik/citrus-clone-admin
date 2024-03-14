import { ShortProductDto, ProductTypeLabel } from "@services/products";

import Link from "@components/ui/Link";
import { Column } from "@components/layout/Table";
import BulletedText from "@components/ui/BulletedText";

import { Routes } from "@router/routes";

export const TABLE_COLUMNS: Column<ShortProductDto>[] = [
  {
    id: "image",
    label: "Зображ.",
    type: "image",
    renderColumn: (product) => (
      <img src={product.images[0].src} alt={product.name} />
    ),
  },
  {
    id: "name",
    label: "Назва",
    sort: true,
    renderColumn: (product) => (
      <Link
        to={Routes.editProduct(product.id)}
        variant="dashed"
        className="link link-dashed">
        {product.name}
      </Link>
    ),
  },
  {
    id: "type",
    label: "Тип",
    renderColumn: (product) => (
      <span>{ProductTypeLabel[product.type]}</span>
    ),
  },
  {
    id: "category",
    label: "Категорія",
    sort: true,
    renderColumn: (product) => (
      <Link
        to={Routes.editCategory(product.category.id)}
        variant="dashed"
        className="link link-dashed">
        {product.category.name}
      </Link>
    ),
  },
  {
    id: "published",
    label: "Статус",
    renderColumn: (product) => (
      <BulletedText
        color={product.published ? "success" : "primary"}
        text={product.published ? "Опублікований" : "Не опублікований"}
      />
    ),
  },
];
