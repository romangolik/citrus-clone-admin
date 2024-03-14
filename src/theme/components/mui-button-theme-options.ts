import { Theme, Components } from "@mui/material";

export const MuiButtonThemeOptions: Components<Theme>["MuiButton"] = {
  defaultProps: {
    variant: "contained",
  },
  styleOverrides: {
    root: {
      borderRadius: "10px",
      textTransform: "inherit",
      fontWeight: "400",
      "&:not(.MuiLoadingButton-root).Mui-disabled": {
        opacity: 0.5,
      },
      "&.MuiLoadingButton-root.Mui-disabled": {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
    },
  },
  variants: [
    {
      props: {
        size: "large",
      },
      style: {
        padding: "14px 30px",
        fontSize: "20px",
        ".MuiButton-startIcon, .MuiButton-endIcon": {
          height: "20px",
          width: "20px",
        },
        ".MuiCircularProgress-root": {
          width: "24px !important",
          height: "24px !important",
        },
      },
    },
    {
      props: {
        size: "medium",
      },
      style: {
        padding: "12px 26px",
        fontSize: "18px",
        ".MuiButton-startIcon, .MuiButton-endIcon": {
          height: "18px",
          width: "18px",
        },
        ".MuiCircularProgress-root": {
          width: "22px !important",
          height: "22px !important",
        },
      },
    },
    {
      props: {
        size: "small",
      },
      style: {
        padding: "8px 18px",
        fontSize: "15px",
        ".MuiButton-startIcon, .MuiButton-endIcon": {
          height: "16px",
          width: "16px",
        },
        ".MuiCircularProgress-root": {
          width: "18px !important",
          height: "18px !important",
        },
      },
    },
    {
      props: {
        variant: "contained",
        color: "success",
      },
      style: {
        color: "var(--color-white)",
        backgroundColor: "var(--color-success)",
        "&:hover": {
          backgroundColor: "var(--color-success-lite)",
        },
        "&:active": {
          backgroundColor: "var(--color-success-dark)",
        },
      },
    },
    {
      props: {
        variant: "outlined",
        color: "success",
      },
      style: {
        color: "var(--color-black)",
        borderColor: "var(--color-success)",
        "&:hover": {
          color: "var(--color-white)",
          borderColor: "var(--color-success-lite)",
          backgroundColor: "var(--color-success-lite)",
        },
        "&:active": {
          color: "var(--color-white)",
          borderColor: "var(--color-success-dark)",
          backgroundColor: "var(--color-success-dark)",
        },
      },
    },
    {
      props: {
        variant: "text",
        color: "success",
      },
      style: {
        color: "var(--color-success)",
        "&:hover": {
          backgroundColor: "rgba(30, 175, 98, 0.04)",
        },
      },
    },
    {
      props: {
        variant: "contained",
        color: "error",
      },
      style: {
        color: "var(--color-black)",
        borderColor: "var(--color-error)",
        "&:hover": {
          color: "var(--color-white)",
          backgroundColor: "var(--color-error-lite)",
        },
        "&:active": {
          color: "var(--color-white)",
          backgroundColor: "var(--color-error-dark)",
        },
      },
    },
    {
      props: {
        variant: "outlined",
        color: "error",
      },
      style: {
        color: "var(--color-black)",
        borderColor: "var(--color-error)",
        "&:hover": {
          color: "var(--color-white)",
          borderColor: "var(--color-error-lite)",
          backgroundColor: "var(--color-error-lite)",
        },
        "&:active": {
          color: "var(--color-white)",
          borderColor: "var(--color-error-dark)",
          backgroundColor: "var(--color-error-dark)",
        },
      },
    },
    {
      props: {
        variant: "text",
        color: "error",
      },
      style: {
        color: "var(--color-error)",
        "&:hover": {
          backgroundColor: "rgb(222, 14, 14, 0.04)",
        },
      },
    },
  ],
};
