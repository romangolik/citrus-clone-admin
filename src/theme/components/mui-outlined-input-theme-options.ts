import { Theme, Components, outlinedInputClasses } from "@mui/material";

export const MuiOutlinedInputThemeOptions: Components<Theme>["MuiOutlinedInput"] =
  {
    styleOverrides: {
      root: {
        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "var(--color-black)",
        },
        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "var(--color-orange)",
        },
        [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "var(--color-error)",
        },
      },
    },
  };
