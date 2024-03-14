import { Theme, Components } from "@mui/material";

export const MuiLinearProgressThemeOptions: Components<Theme>["MuiLinearProgress"] =
  {
    styleOverrides: {
      root: {
        position: "fixed",
        top: "80px",
        left: "0",
        width: "100%",
        zIndex: "50",
        backgroundColor: "var(--color-success-lite)",
        "& .MuiLinearProgress-bar": {
          backgroundColor: "var(--color-success-dark)",
        },
      },
    },
  };
