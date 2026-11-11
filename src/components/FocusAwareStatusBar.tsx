import { StatusBar } from "expo-status-bar";
import type { ComponentProps } from "react";

import { useIsFocused } from "@react-navigation/native";

export const FocusAwareStatusBar = (
  props: ComponentProps<typeof StatusBar>,
) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};
