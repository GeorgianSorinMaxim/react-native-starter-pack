import React, { useState } from "react";
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { PhoneNumberPrefix } from "../components";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

interface CountryCodeValueType {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface PickerElement {
  key: string;
  value: string;
}

interface Props {
  onValueSelected?: (item: PickerElement) => void;
  onCountryCodeValueSelected?: (item: CountryCodeValueType) => void;
  countryCodePicker?: boolean;
  pickerData?: PickerElement[];
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  styleArrow?: StyleProp<ViewStyle>;
  value?: string;
  required?: boolean;
}

export const Dropdown = (props: Props) => {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [renderPicker, setRenderPicker] = useState<boolean>(false);

  const showPicker = () => {
    setRenderPicker(true);
  };

  const setDropdownValue = (itemIndex: number) => {
    setItemIndex(itemIndex);
  };

  const onValueChange = () => {
    setRenderPicker(false);

    const { pickerData, onValueSelected } = props;

    if (pickerData && onValueSelected) {
      const selectedPickerValue = pickerData[itemIndex];
      onValueSelected(selectedPickerValue);
    }
  };

  const onCountryCodeValueChange = (
    selectedPickerValue: CountryCodeValueType,
  ) => {
    setRenderPicker(false);

    const { onCountryCodeValueSelected } = props;

    if (onCountryCodeValueSelected) {
      onCountryCodeValueSelected(selectedPickerValue);
    }
  };

  const renderPickerData = (item: PickerElement, index: number) => (
    <Picker.Item label={item.key} value={index} key={index} />
  );

  const {
    pickerData,
    countryCodePicker,
    placeholder,
    value,
    style,
    styleInput,
    styleArrow,
    required,
  } = props;

  return (
    <View>
      <TouchableOpacity onPress={showPicker} style={[styles.container, style]}>
        <View pointerEvents={"none"}>
          <TextInput
            placeholder={placeholder}
            value={value}
            style={[
              styleInput,
              styles.textInput,
              value
                ? { fontSize: 20, color: Colors.black }
                : { fontSize: 16, color: Colors.grey },
              required && !value
                ? { borderBottomColor: Colors.required }
                : null,
            ]}
          />
        </View>
        <View style={[styles.dropdownArrow, styleArrow]}>
          <Icon name="chevron-down" size={22} color="rgba(0,0,0,0.35)" />
        </View>
      </TouchableOpacity>

      {pickerData && renderPicker ? (
        <Modal animationType="slide" visible transparent>
          <View style={styles.contentContainer}>
            <View style={[styles.picker, { backgroundColor: Colors.white }]}>
              <View style={{ backgroundColor: Colors.lightGrey }}>
                <TouchableOpacity onPress={onValueChange} style={styles.button}>
                  <Text style={[styles.buttonText, { color: Colors.blue }]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={itemIndex}
                onValueChange={setDropdownValue}>
                {pickerData.map(renderPickerData)}
              </Picker>
            </View>
          </View>
        </Modal>
      ) : null}

      {countryCodePicker && renderPicker ? (
        <Modal animationType="slide" visible transparent>
          <View style={styles.contentContainer}>
            <PhoneNumberPrefix onValueChange={onCountryCodeValueChange} />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    height: 46,
    padding: 10,
    marginBottom: 8,
    color: Colors.black,
    borderColor: Colors.black,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dropdownArrow: {
    position: "absolute",
    right: 12,
    top: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 16,
  },
  contentContainer: {
    flex: 1,
    height: 300,
    width: "100%",
  },
  picker: {
    position: "absolute",
    left: 0,
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
