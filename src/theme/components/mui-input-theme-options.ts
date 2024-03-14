import { Theme, Components } from "@mui/material";

export const MuiInputThemeOptions: Components<Theme>["MuiInput"] = {
  styleOverrides: {
    root: {
      "&:after": {
        borderBottom: "2px solid var(--color-black)",
      },
      "&:hover:not(.Mui-disabled, .Mui-error):before": {
        borderBottom: "2px solid var(--color-black)",
      },
      "&.Mui-error:after": {
        borderBottomColor: "var(--color-error)",
      },
      "&.Mui-error:before": {
        borderBottomColor: "var(--color-error)",
      },
    },
  },
};