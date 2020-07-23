import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { RectButton } from "react-native-gesture-handler";

type LinkButtonProps = {
  label: string,
  onPress: () => void,
  isLastOption: boolean
}

const LinkButton = ({ label, onPress, isLastOption }: LinkButtonProps) => {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Icon name="link" size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row"
  },
  iconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});

export default LinkButton;