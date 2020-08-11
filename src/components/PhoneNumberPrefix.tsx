import React, { Component } from "react";
import { Picker, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
import { data } from "../utils/countries";

interface CountryCodeValueType {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface State {
  itemIndex: number;
}

interface Props {
  onValueChange: (itemValue: CountryCodeValueType) => void;
}

const initialIndex = data.findIndex((obj) => obj.code === "GB");

class PhoneNumberPrefix extends Component<Props, State> {
  state = {
    itemIndex: initialIndex,
  };

  setSelectedValue = (itemIndex: number) => {
    this.setState({ itemIndex });
  };

  renderPickerData = (item: CountryCodeValueType, index: number) => (
    <Picker.Item label={`${item.name} (${item.dialCode})`} value={index} key={index} />
  );

  render() {
    const { itemIndex } = this.state;
    const { onValueChange } = this.props;
    const itemValue = data[itemIndex];

    return (
      <View style={[styles.picker, { backgroundColor: Colors.white }]}>
        <View style={{ backgroundColor: Colors.lightGrey }}>
          <TouchableOpacity onPress={() => onValueChange(itemValue)} style={styles.button}>
            <Text style={[styles.buttonText, { color: Colors.blue }]}>Done</Text>
          </TouchableOpacity>
        </View>
        <Picker selectedValue={itemIndex} onValueChange={(itemIndex) => this.setSelectedValue(itemIndex)}>
          {data.map(this.renderPickerData)}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 99,
    elevation: 98,
  },
  button: {
    alignItems: "flex-end",
  },
  buttonText: {
    padding: 12,
  },
});

export default PhoneNumberPrefix;
