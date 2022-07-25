import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Colors } from "../constants/Colors";

type Props = {
  children: React.ReactNode;
  noHorizontalPadding?: boolean;
};

export const Screen = ({ children, noHorizontalPadding }: Props) => (
  <View
    style={[
      noHorizontalPadding
        ? styles.noHorizontalPaddingContainer
        : styles.container,
    ]}>
    <KeyboardAwareScrollView
      style={styles.keyboardAwareScrollView}
      keyboardShouldPersistTaps="always">
      {children}
    </KeyboardAwareScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white,
  },
  noHorizontalPaddingContainer: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: Colors.white,
  },
  keyboardAwareScrollView: {
    flex: 1,
    width: "100%",
  },
});
