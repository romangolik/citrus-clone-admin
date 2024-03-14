import React, { FC, PropsWithChildren } from "react";

import { useDispatch } from "react-redux"; 
import NiceModal from "@ebay/nice-modal-react";

import { useTypedSelector } from "@utils/hooks/useTypedSelector";

interface ModalsProviderProps extends PropsWithChildren {}

const ModalsProvider: FC<ModalsProviderProps> = ({ children }) => {
  const modals = useTypedSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <NiceModal.Provider modals={modals} dispatch={dispatch}>
      {children}
    </NiceModal.Provider>
  );
};

export default ModalsProvider;
