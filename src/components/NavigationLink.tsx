import React, { memo } from "react";

import { TouchableOpacity } from "react-native";

import { BodyText, BodyTextProps } from "./BodyText";

export interface NavigationLinkProps extends BodyTextProps {}

type Props = {
  text: string;
  capitalized?: boolean;
  onPress: () => void;
};

export const NavigationLink = memo(
  ({ text, capitalized, onPress, ...rest }: BodyTextProps & Props) => (
    <TouchableOpacity onPress={onPress}>
      <BodyText
        capitalized={capitalized}
        color="purple"
        fontWeight="light"
        size="medium"
        spacingSize="large"
        {...rest}>
        {text}
      </BodyText>
    </TouchableOpacity>
  ),
);
