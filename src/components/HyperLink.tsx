import React, { memo } from "react";
import { Alert, Linking, TouchableOpacity } from "react-native";

import { BodyText, BodyTextProps } from "./BodyText";

type Props = {
  text: string;
  url: string;
};

const openUrl = (url: string) =>
  Linking.openURL(url).catch(() =>
    Alert.alert(`Error:, ${url} could not be opened!`),
  );

export const HyperLink = memo(
  ({ text, url, ...rest }: BodyTextProps & Props) => (
    <TouchableOpacity onPress={() => openUrl(url)}>
      <BodyText
        capitalized
        color="purple"
        fontWeight="regular"
        size="large"
        {...rest}>
        {text}
      </BodyText>
    </TouchableOpacity>
  ),
);
