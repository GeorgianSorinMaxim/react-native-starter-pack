import React, { memo } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { ColorToken, theme } from "../theme";

export interface TextProps extends RNTextProps {
  color?: ColorToken;
  underline?: boolean;
  strikethrough?: boolean;
  alignment?: "auto" | "left" | "right" | "center" | "justify";
  hasShadow?: boolean;
}

type TextDecorationLineType =
  | "underline"
  | "line-through"
  | "none"
  | "underline line-through";

export const Text = memo(
  ({
    style,
    color = "black",
    underline = false,
    strikethrough = false,
    alignment = "auto",
    hasShadow = false,
    ...rest
  }: TextProps) => {
    let textDecorationLine = "";
    if (underline) textDecorationLine += "underline";
    if (underline && strikethrough) textDecorationLine += " ";
    if (strikethrough) textDecorationLine += "line-through";
    if (!textDecorationLine) textDecorationLine = "none";

    let shadow = {};
    if (hasShadow) {
      shadow = {
        textShadowColor: theme.colors.primary,
        textShadowRadius: 10,
      };
    }

    return (
      <RNText
        style={[
          {
            color: theme.colors[color],
            textDecorationLine: textDecorationLine as TextDecorationLineType,
            textAlign: alignment,
            ...shadow,
          },
          style,
        ]}
        {...rest}
      />
    );
  },
);
