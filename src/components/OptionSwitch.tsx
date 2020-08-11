import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";

interface Props {
  value: boolean | null;
  onValueChange: (value: boolean) => void;
  required?: boolean;
}

export default class OptionSwitch extends Component<Props> {
  render() {
    const { value, required, onValueChange } = this.props;

    return (
      <View style={[styles.container, required ? { borderBottomColor: Colors.required, borderBottomWidth: 1 } : null]}>
        <TouchableOpacity onPress={() => onValueChange(true)}>
          <Text style={[styles.labelStyle, value === true ? styles.active : null]}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onValueChange(false)}>
          <Text style={[styles.labelStyle, value === false ? styles.active : null]}>No</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginRight: 1,
    marginBottom: 8,
  },
  labelStyle: {
    flex: 1,
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.lightGrey,
    borderRadius: 6,
  },
  active: {
    fontWeight: "600",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
});
