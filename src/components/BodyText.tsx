import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

interface Props<T> {
  children: T;
  style?: StyleProp<TextStyle>;
}

export const BodyText = (props: Props<any> & TextProps) => {
  return <Text {...props} style={[props.style]} />;
};
