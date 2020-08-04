import React, { FC } from "react";
import { Alert, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

type Props = {
  text: string
  url: string
}

const openUrl = (url: string) => Linking.openURL(url).catch(() => Alert.alert('Error', `${url} could not be opened!`));

const HyperLink: FC<Props> = ({ text, url }) => (
  <TouchableOpacity style={styles.linkContainer} onPress={() => openUrl(url)}>
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  linkContainer: {
    alignSelf: 'center'
  },
  linkText: {
    fontSize: 14,
    color: Colors.link,
    textDecorationLine: 'underline'
  },
})

export default HyperLink;
