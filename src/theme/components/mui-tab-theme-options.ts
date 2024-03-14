import { Theme, Components } from "@mui/material";

export const MuiTabThemeOptions: Components<Theme>["MuiTab"] = {
  styleOverrides: {
    root: {
      "&.Mui-selected": {
        color: "var(--color-orange)"
      }
    },
  },
};
