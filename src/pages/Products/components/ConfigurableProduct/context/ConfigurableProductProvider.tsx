import { FC, PropsWithChildren } from "react";

import {
  ConfigurableProductContext,
  IConfigurableProductContext,
} from "./ConfigurableProductContext";

interface ConfigurableProductProviderProps
  extends PropsWithChildren,
    IConfigurableProductContext {}

const ConfigurableProductProvider: FC<ConfigurableProductProviderProps> = ({
  children,
  ...data
}) => {
  return (
    <ConfigurableProductContext.Provider value={data}>
      {children}
    </ConfigurableProductContext.Provider>
  );
};

export default ConfigurableProductProvider;
