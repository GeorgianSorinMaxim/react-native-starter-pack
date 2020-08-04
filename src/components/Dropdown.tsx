import React, { Component } from "react";
import { Modal, Picker, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";

import { PhoneNumberPrefix } from "../components";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';

interface CountryCodeValueType {
  name: string
  flag: string
  code: string
  dialCode: string
}

interface PickerElement {
  key: string
  value: any
}

interface Props {
  onValueSelected?: (item: PickerElement) => void
  onCountryCodeValueSelected?: (item: CountryCodeValueType) => void
  countryCodePicker?: boolean
  pickerData?: any[]
  placeholder?: string
  style?: StyleProp<ViewStyle>
  styleInput?: StyleProp<ViewStyle>
  styleArrow?: StyleProp<ViewStyle>
  value?: string
  required?: boolean
}

interface State {
  itemIndex: number
  renderPicker: boolean
}

class Dropdown extends Component<Props, State> {
  state = {
    itemIndex: 0,
    renderPicker: false,
  };

  showPicker = () => {
    this.setState({ renderPicker: true });
  }

  setDropdownValue = (itemIndex: number) => {
    this.setState({ itemIndex });
  }

  onValueChange = () => {
    this.setState({ renderPicker: false })
    const { pickerData, onValueSelected } = this.props;
    const { itemIndex } = this.state;

    if (pickerData && onValueSelected) {
      const selectedPickerValue = pickerData[itemIndex];
      onValueSelected(selectedPickerValue);
    }
  }

  onCountryCodeValueChange = (selectedPickerValue: CountryCodeValueType) => {
    this.setState({ renderPicker: false });
    const { onCountryCodeValueSelected } = this.props;
    if (onCountryCodeValueSelected) {
      onCountryCodeValueSelected(selectedPickerValue);
    }
  }

  renderPickerData = (item: PickerElement, index: number) => <Picker.Item label={item.key} value={index} key={index} />

  render() {
    const {
      pickerData,
      countryCodePicker,
      placeholder,
      value,
      style,
      styleInput,
      styleArrow,
      required,
    } = this.props;
    const { renderPicker, itemIndex } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={this.showPicker} style={[styles.container, style]}>
          <View pointerEvents={'none'}>
            <TextInput
              placeholder={placeholder}
              value={value}
              style={[
                styleInput,
                styles.textInput,
                value ? { fontSize: 20, color: Colors.black } : { fontSize: 16, color: Colors.grey },
                required && !value ? { borderBottomColor: Colors.required } : null,
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
                  <TouchableOpacity onPress={this.onValueChange} style={styles.button}>
                    <Text style={[styles.buttonText, { color: Colors.blue }]}>Done</Text>
                  </TouchableOpacity>
                </View>
                <Picker selectedValue={itemIndex} onValueChange={this.setDropdownValue}>
                  {pickerData.map(this.renderPickerData)}
                </Picker>
              </View>
            </View>
          </Modal>
        ) : null}

        {countryCodePicker && renderPicker ? (
          <Modal animationType="slide" visible transparent>
            <View style={styles.contentContainer}>
              <PhoneNumberPrefix onValueChange={this.onCountryCodeValueChange} />
            </View>
          </Modal>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInput: {
    height: 46,
    padding: 10,
    marginBottom: 8,
    color: Colors.black,
    borderColor: Colors.black,
    borderWidth: StyleSheet.hairlineWidth
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

export default Dropdown;
