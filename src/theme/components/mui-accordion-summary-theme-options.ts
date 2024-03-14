import { Theme, Components } from "@mui/material";

export const MuiAccordionSummaryThemeOptions: Components<Theme>["MuiAccordionSummary"] =
  {
    styleOverrides: {
      root: {
        padding: "20px",
        backgroundColor: "transparent",
        flexDirection: "row",
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(180deg)",
          transitionDuration: "400ms",
        },
        "& .MuiAccordionSummary-content": {
          margin: "0",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "23px",
        },
        "&:hover .MuiAccordionSummary-content": {
          textDecoration: "underline",
        },
      },
    },
  };
