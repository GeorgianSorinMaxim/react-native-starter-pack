import React, { memo } from "react";

import { HeadingSizingToken, theme } from "../theme";
import { Text, TextProps } from "./Text";

export interface HeadingProps extends TextProps {
  size?: HeadingSizingToken;
}

export const Heading = memo(
  ({ style, color = "primary", size = "large", ...rest }: HeadingProps) => (
    <Text
      color={color}
      style={[
        {
          fontFamily: theme.typography.headings.fontFamilies.regular,
          fontSize: theme.typography.headings.sizing[size].fontSize,
          lineHeight: theme.typography.headings.sizing[size].lineHeight,
        },
        style,
      ]}
      {...rest}
    />
  ),
);
