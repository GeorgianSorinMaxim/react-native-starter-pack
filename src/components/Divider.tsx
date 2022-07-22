import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";

interface OwnProps {
  margin?: number;
}

type Props = ViewProps & OwnProps;

const Divider: FC<Props> = ({ margin, ...props }) => (
  <View
    {...props}
    style={[styles.container, margin ? { marginVertical: margin } : null]}
  />
);

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: Colors.gold,
  },
});

export default Divider;
