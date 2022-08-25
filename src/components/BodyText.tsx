import React, { memo } from "react";

import {
  BodyTextFontFamilyToken,
  BodyTextSizingToken,
  BodyTextLetterSpacingToken,
  theme,
} from "../theme";
import { Text, TextProps } from "./Text";

export interface BodyTextProps extends TextProps {
  size?: BodyTextSizingToken;
  fontWeight?: BodyTextFontFamilyToken;
  capitalized?: boolean;
  spacingSize?: BodyTextLetterSpacingToken;
}

export const BodyText = memo(
  ({
    style,
    fontWeight = "light",
    capitalized = false,
    size = "medium",
    spacingSize = "regular",
    ...rest
  }: BodyTextProps) => (
    <Text
      style={[
        {
          textTransform: capitalized ? "uppercase" : "none",
          fontFamily: theme.typography.bodyText.fontFamilies[fontWeight],
          fontSize: theme.typography.bodyText.sizing[size].fontSize,
          lineHeight: theme.typography.bodyText.sizing[size].lineHeight,
          letterSpacing:
            theme.typography.bodyText.spacing[spacingSize].letterSpacing,
        },
        style,
      ]}
      {...rest}
    />
  ),
);
