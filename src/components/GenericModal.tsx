import React from "react";
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";

export type ButtonOptions = {
  title: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

interface Props {
  title: string;
  primaryButton: ButtonOptions;
  secondaryButton?: ButtonOptions;
  body?: string;
  bodyStyle?: StyleProp<TextStyle>;
  buttonShapeStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  modalStyle?: StyleProp<ViewStyle>;
}

export const GenericModal = (props: Props) => {
  const {
    title,
    body,
    bodyStyle,
    buttonShapeStyle,
    modalStyle,
    primaryButton,
    secondaryButton,
    titleStyle,
    children,
  } = props;

  return (
    <Modal visible transparent>
      <View style={styles.modalBackground}>
        <View
          style={[
            modalStyle || styles.modalContainer,
            { backgroundColor: Colors.white },
          ]}>
          <Text
            style={[styles.modalHeader, titleStyle || { color: Colors.blue }]}>
            {title}
          </Text>

          {body ? (
            <Text style={[styles.body, bodyStyle || { color: Colors.black }]}>
              {body}
            </Text>
          ) : null}

          {children || null}

          <View style={[secondaryButton ? styles.buttonsRow : null]}>
            {secondaryButton ? (
              <TouchableOpacity
                onPress={secondaryButton.onPress}
                style={buttonShapeStyle || styles.callToAction}>
                <Text
                  style={[
                    styles.modalButton,
                    secondaryButton.style
                      ? secondaryButton.style
                      : { color: Colors.grey },
                  ]}>
                  {secondaryButton.title}
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={primaryButton.onPress}
              style={buttonShapeStyle || styles.callToAction}>
              <Text
                style={[
                  styles.modalButton,
                  primaryButton.style
                    ? primaryButton.style
                    : { color: Colors.grey },
                ]}>
                {primaryButton.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
    elevation: 0,
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 24,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 16,
    fontSize: 16,
  },
  buttonsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  callToAction: {
    padding: 24,
  },
  body: {
    textAlign: "center",
  },
  text: {
    marginVertical: 12,
  },
});
