import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../constants/Colors";
import { data } from "../utils/countries";

interface CountryCodeValueType {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface Props {
  onValueChange: (itemValue: CountryCodeValueType) => void;
}

const initialIndex = data.findIndex(obj => obj.code === "GB");

export const PhoneNumberPrefix = ({ onValueChange }: Props) => {
  const [itemIndex, setItemIndex] = useState<number>(initialIndex);

  const setSelectedValue = (itemIndex: number) => {
    setItemIndex(itemIndex);
  };

  const renderPickerData = (item: CountryCodeValueType, index: number) => (
    <Picker.Item
      label={`${item.name} (${item.dialCode})`}
      value={index}
      key={index}
    />
  );

  const itemValue = data[itemIndex];

  return (
    <View style={[styles.picker, { backgroundColor: Colors.white }]}>
      <View style={{ backgroundColor: Colors.lightGrey }}>
        <TouchableOpacity
          onPress={() => onValueChange(itemValue)}
          style={styles.button}>
          <Text style={[styles.buttonText, { color: Colors.blue }]}>Done</Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={itemIndex}
        onValueChange={(itemIndex: number) => setSelectedValue(itemIndex)}>
        {data.map(renderPickerData)}
      </Picker>
    </View>
  );
};

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
