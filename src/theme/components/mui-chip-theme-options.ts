import { Theme, Components } from "@mui/material";

export const MuiChipThemeOptions: Components<Theme>["MuiChip"] = {
  styleOverrides: {
    root: {
      "&.MuiChip-filledSuccess": {
        color: "var(--color-white)",
        backgroundColor: "var(--color-success)",
      },
      "&.MuiChip-outlinedSuccess": {
        color: "var(--color-black)",
        borderColor: "var(--color-success)",
      },
      "&.MuiChip-filledError": {
        color: "var(--color-white)",
        backgroundColor: "var(--color-error)",
      },
      "&.MuiChip-outlinedError": {
        color: "var(--color-black)",
        borderColor: "var(--color-error)",
      }
    },
  },
};
