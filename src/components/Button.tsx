import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import Colors from "../constants/Colors";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button = ({ title, onPress, disabled }: ButtonProps) => {
  return !disabled ? (
    <RectButton style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  ) : (
    <View style={styles.disabledButtonContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    backgroundColor: Colors.gold,
  },
  disabledButtonContainer: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    backgroundColor: Colors.grey,
  },
  title: {
    fontSize: 12,
    color: Colors.white,
    alignSelf: "center",
    letterSpacing: 4,
    fontWeight: "bold",
  },
});

export default Button;
