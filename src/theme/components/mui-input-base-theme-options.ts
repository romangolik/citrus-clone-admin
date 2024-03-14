import { Theme, Components, inputBaseClasses } from "@mui/material";

export const MuiInputBaseThemeOptions: Components<Theme>["MuiInputBase"] = {
  styleOverrides: {
    root: {
      [`&.${inputBaseClasses.multiline} .${inputBaseClasses.input}`]: {
        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          borderRadius: 20,
          backgroundColor: "#EDEDED",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: 15,
          backgroundColor: "rgba(5, 10, 12, 15%)",
          cursor: "pointer",

          "&:hover": {
            background: "rgba(5, 10, 12, 40%)",
          },
        },
      },
    },
  },
};