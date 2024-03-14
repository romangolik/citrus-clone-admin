import { Theme, Components } from "@mui/material";

export const MuiFormHelperTextThemeOptions: Components<Theme>["MuiFormHelperText"] =
  {
    styleOverrides: {
      root: {
        fontSize: "0.8rem",
        "&.Mui-error": {
          color: "var(--color-error)",
        },
      },
    },
  };
