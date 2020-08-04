import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../constants/Colors";

type Props = {
  noHorizontalPadding?: boolean
}

const Screen: FC<Props> = ({ children, noHorizontalPadding }) => (
  <View style={[noHorizontalPadding ? styles.noHorizontalPaddingContainer : styles.container]}>
    <KeyboardAwareScrollView style={styles.keyboardAwareScrollView} keyboardShouldPersistTaps="always" >
      {children}
    </KeyboardAwareScrollView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.white
  },
  noHorizontalPaddingContainer: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: Colors.white
  },
  keyboardAwareScrollView: {
    flex: 1,
    width: '100%'
  }
});


export default Screen
