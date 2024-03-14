/* eslint-disable perfectionist/sort-imports */
import { Theme, Components } from "@mui/material";

//Inputs
import { MuiInputThemeOptions } from "./mui-input-theme-options";
import { MuiInputBaseThemeOptions } from "./mui-input-base-theme-options";
import { MuiFormControlThemeOptions } from "./mui-form-control-theme-options";
import { MuiOutlinedInputThemeOptions } from "./mui-outlined-input-theme-options";
import { MuiFormHelperTextThemeOptions } from "./mui-form-helper-text-theme-options";

//Badge
import { MuiBadgeThemeOptions } from "./mui-badge-theme-options";

//Button
import { MuiButtonThemeOptions } from "./mui-button-theme-options";

//Radio
import { MuiRadioThemeOptions } from "./mui-radio-theme-options";

//Switch
import { MuiSwitchThemeThemeOptions } from "./mui-switch-theme-options";

//Accordion
import { MuiAccordionSummaryThemeOptions } from "./mui-accordion-summary-theme-options";
import { MuiAccordionDetailsThemeOptions } from "./mui-accordion-details-theme-options";

//Progress
import { MuiLinearProgressThemeOptions } from "./mui-linear-progress-theme-options";

//Checkbox
import { MuiCheckboxThemeOptions } from "./mui-checkbox-theme-options";

//Tabs
import { MuiTabThemeOptions } from "./mui-tab-theme-options";
import { MuiTabsThemeOptions } from "./mui-tabs-theme-options";

//Chip
import { MuiChipThemeOptions } from "./mui-chip-theme-options";

//Table
import { MuiTableSortLabelThemeOptions } from "./mui-table-sort-label-theme-options";

export const components: Components<Theme> = {
  //Inputs
  MuiFormHelperText: MuiFormHelperTextThemeOptions,
  MuiFormControl: MuiFormControlThemeOptions,
  MuiInputBase: MuiInputBaseThemeOptions,
  MuiInput: MuiInputThemeOptions,
  MuiOutlinedInput: MuiOutlinedInputThemeOptions,

  //Badge
  MuiBadge: MuiBadgeThemeOptions,

  //Button
  MuiButton: MuiButtonThemeOptions,

  //Radio
  MuiRadio: MuiRadioThemeOptions,

  //Switch
  MuiSwitch: MuiSwitchThemeThemeOptions,

  //Accordion
  MuiAccordionSummary: MuiAccordionSummaryThemeOptions,
  MuiAccordionDetails: MuiAccordionDetailsThemeOptions,

  //Progress
  MuiLinearProgress: MuiLinearProgressThemeOptions,

  //Checkbox
  MuiCheckbox: MuiCheckboxThemeOptions,

  //Tabs
  MuiTab: MuiTabThemeOptions,
  MuiTabs: MuiTabsThemeOptions,

  //Chip
  MuiChip: MuiChipThemeOptions,

  //Table
  MuiTableSortLabel: MuiTableSortLabelThemeOptions,
};
