import { ProductImageDto } from "@services/products";

import Link from "@components/ui/Link";
import { Column } from "@components/layout/Table";

import { Routes } from "@router/routes";

import { prettyBytes } from "@utils/helpers/prettyBytes";
import { prettyCreateDate } from "@utils/helpers/prettyCreateDate";

export const TABLE_COLUMNS: Column<ProductImageDto>[] = [
  {
    id: "image",
    label: "Зображ.",
    type: "image",
    renderColumn: (productImage) => <img src={productImage.src} alt="" />,
  },
  {
    id: "name",
    label: "Назва",
    minWidth: 200,
    width: "45%",
    sort: true,
    renderColumn: (productImage) => (
      <div className="products-media-table__info">
        <p className="products-media-table__name">{productImage.name}</p>
        <p className="products-media-table__extension medium-weight">
          {productImage.extension.toUpperCase()}
        </p>
      </div>
    ),
  },
  {
    id: "createdAt",
    label: "Дата додання",
    minWidth: 156,
    sort: true,
    renderColumn: (productImage) => <p>{prettyCreateDate(productImage.createdAt)}</p>,
  },
  {
    id: "fileSize",
    label: "Розмір",
    minWidth: 120,
    sort: true,
    renderColumn: (productImage) => <p>{prettyBytes(productImage.fileSize)}</p>,
  },
  {
    id: "products",
    label: "Продукт",
    minWidth: 150,
    renderColumn: (productImage) =>
      productImage?.products.length > 0 ? (
        <Link
          to={Routes.editProduct(productImage.products[0].id)}
          variant="dashed"
          className="link link-dashed">
          {productImage.products[0].name}
        </Link>
      ) : (
        <p>—</p>
      ),
  },
];
