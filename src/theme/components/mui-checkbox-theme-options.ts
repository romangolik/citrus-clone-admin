import { Theme, Components, checkboxClasses } from "@mui/material";

export const MuiCheckboxThemeOptions: Components<Theme>["MuiCheckbox"] = {
  styleOverrides: {
    root: {
      [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
        color: "var(--color-orange)",
      },
    },
  },
};
