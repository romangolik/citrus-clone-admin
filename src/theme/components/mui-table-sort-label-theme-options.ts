import { Theme, Components } from "@mui/material";

export const MuiTableSortLabelThemeOptions: Components<Theme>["MuiTableSortLabel"] = {
  styleOverrides: {
    root: {
      "&:hover, &:focus": {
        color: "rgba(0, 0, 0, 0.87)",
      },
    },
  },
};
