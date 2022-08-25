import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { colors } from "../theme";

type Props = {
  children: React.ReactNode;
  noHorizontalPadding?: boolean;
  transparent?: boolean;
};

export const Screen = ({
  children,
  noHorizontalPadding,
  transparent,
}: Props) => (
  <View
    style={[
      noHorizontalPadding
        ? styles.noHorizontalPaddingContainer
        : styles.container,
      !transparent ? styles.backgroundColor : null,
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
  },
  backgroundColor: {
    backgroundColor: colors.white,
  },
  noHorizontalPaddingContainer: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: colors.white,
  },
  keyboardAwareScrollView: {
    flex: 1,
    width: "100%",
  },
});
