import { colors } from "./colors";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";
import { typography } from "./typography";

export const theme = {
  colors,
  spacing,
  zIndices,
  typography,
};

export type ThemeType = typeof theme;

export * from "./colors";
export * from "./spacing";
export * from "./zIndices";
export * from "./typography";
