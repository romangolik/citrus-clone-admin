import { Theme, Components } from "@mui/material";

declare module "@mui/material/Badge" {
  interface BadgePropsVariantOverrides {
    contained: true;
    outlined: true;
  }
}

export const MuiBadgeThemeOptions: Components<Theme>["MuiBadge"] = {
  defaultProps: {
    variant: "outlined",
  },
  styleOverrides: {
    root: {
      ".MuiBadge-badge": {
        height: "auto",
        padding: "4px 8px",
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: "18px",
        borderRadius: "5px",
      },
    },
  },
  variants: [
    {
      props: {
        variant: "contained",
      },
      style: {
        ".MuiBadge-badge": {
          color: "var(--color-white)",
          border: "none",
          backgroundColor: "var(--color-orange-lite)",
        },
      },
    },
    {
      props: {
        variant: "outlined",
      },
      style: {
        ".MuiBadge-badge": {
          border: "1px solid rgba(5,10,12,.15)",
          backgroundColor: "transparent",
          transform: "translateX(100%)",
        },
      },
    },
  ],
};
