import React, { FC } from "react";

import { LinearProgress } from "@mui/material";

import { useTypedSelector } from "@utils/hooks/useTypedSelector";

const ProgressBar: FC = () => {
  const { isShown } = useTypedSelector((state) => state.progressBar);

  if (isShown) {
    return <LinearProgress />;
  }

  return null;
};

export default ProgressBar;
