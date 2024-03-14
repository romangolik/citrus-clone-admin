import { createContext } from "react";

import { AttributeDto } from "@services/attributes";

export interface IConfigurableProductContext {
  setAttributes: (array: AttributeDto[]) => void;
  getAttributesAsArray: () => AttributeDto[];
  getAttributesAsHashMap: () => Map<number, AttributeDto>;
}

export const ConfigurableProductContext =
  createContext<IConfigurableProductContext | null>(null);
