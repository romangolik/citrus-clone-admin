import { AttributeDto } from "@services/attributes";

import { Column } from "@components/layout/Table";

export const TABLE_COLUMNS: Column<AttributeDto>[] = [
  {
    id: "name",
    label: "Назва",
    renderColumn: (attribute) => <p>{attribute.name}</p>,
  },
];
