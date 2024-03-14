import { useContext } from "react";

import { ConfigurableProductContext } from "./ConfigurableProductContext";

export function useConfigurableProductContext() {
  const context = useContext(ConfigurableProductContext);
  if (!context) {
    throw new Error(
      "useConfigurableProductContext must be used within an ConfigurableProductContext"
    );
  }
  return context;
}