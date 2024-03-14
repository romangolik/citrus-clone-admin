import { createTheme } from "@mui/material";

import { components } from "./components";

export const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  components: components,
});
