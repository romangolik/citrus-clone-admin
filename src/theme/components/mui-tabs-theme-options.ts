import { Theme, Components } from "@mui/material";

export const MuiTabsThemeOptions: Components<Theme>["MuiTabs"] = {
  styleOverrides: {
    root: {
      ".MuiTabs-indicator": {
        backgroundColor: "var(--color-orange)"
      }
    },
  },
};
