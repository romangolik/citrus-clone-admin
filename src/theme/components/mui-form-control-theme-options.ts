import { Theme, Components } from "@mui/material";

export const MuiFormControlThemeOptions: Components<Theme>["MuiFormControl"] = {
  styleOverrides: {
    root: {
      "& label.Mui-focused": {
        color: "var(--color-orange)",
      },
      "& label.Mui-error": {
        color: "var(--color-error)",
      },
    },
  },
};
