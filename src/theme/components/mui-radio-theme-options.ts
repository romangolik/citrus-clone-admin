import { Theme, Components } from "@mui/material";

export const MuiRadioThemeOptions: Components<Theme>["MuiRadio"] = {
  styleOverrides: {
    root: {
      ".MuiSvgIcon-root": {
        fontSize: 28,
      },
      "&.Mui-checked": {
        color: "var(--color-orange)",
      },
    },
  },
};
