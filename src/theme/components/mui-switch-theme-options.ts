import { Theme, Components } from "@mui/material";

import icon from "@assets/icons/switch/false.svg";
import activeIcon from "@assets/icons/switch/true.svg";

export const MuiSwitchThemeThemeOptions: Components<Theme>["MuiSwitch"] = {
  styleOverrides: {
    root: {
      height: "34px",
      width: "62px",
      marginRight: "0",
      padding: "0",
      overflow: "visible",
      ".MuiSwitch-track": {
        opacity: 1,
        borderRadius: "20px",
        backgroundColor: "rgba(5,10,12,.15)",
      },
      ".MuiSwitch-thumb": {
        position: "relative",
        height: "24px",
        width: "24px",
        "&:before": {
          content: "''",
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "8px",
          width: "8px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundImage: `url('${icon}')`,
          transform: "translate(-50%, -50%)",
        },
      },
      ".MuiSwitch-switchBase": {
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translate(-4px, -50%)",
      },
      ".MuiSwitch-switchBase.Mui-checked": {
        color: "var(--color-white)",
        transform: "translate(24px, -50%)",
        ".MuiSwitch-thumb:before": {
          backgroundImage: `url('${activeIcon}')`,
        },
      },
      ".MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1eaf62",
      },
    },
  },
};
