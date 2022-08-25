import React, { memo } from "react";
import { StyleSheet } from "react-native";

import { colors } from "../theme";
import { Box, BoxProps } from "./Box";

export interface SeperatorProps extends BoxProps {}

export const Separator = memo(({ style, ...rest }: SeperatorProps) => (
  <Box style={[styles.wrapper, style]} {...rest}>
    <Box style={styles.line} />
  </Box>
));

const styles = StyleSheet.create({
  wrapper: {
    height: 1,
    overflow: "hidden",
  },
  line: {
    height: 1,
    backgroundColor: colors["grey-100"],
  },
});
