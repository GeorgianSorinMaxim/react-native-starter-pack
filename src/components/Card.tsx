import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ImagePlaceholder from "./ImagePlaceholder";

import Colors from "../constants/Colors";
import BodyText from "./BodyText";

import { University } from "../store/reducers/data";

interface Props {
  item: University;
}

export const Card = ({ item }: Props) => {
  const onItemTap = (url: string) => {
    Linking.openURL(url).catch(err => console.warn(err));
  };

  const { imageUrl, geo } = item;

  let address = "No address";
  if (geo && geo.address) {
    const { streetAddress, postalCode, addressLocality } = geo.address;
    address = `${streetAddress}, ${postalCode}, ${addressLocality}`;
  }

  return (
    <TouchableOpacity onPress={() => onItemTap(item.url)}>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <BodyText style={styles.universityName}>{item.name}</BodyText>
          <BodyText style={styles.address}>{address}</BodyText>
        </View>
        <View style={styles.rightColumn}>
          {!imageUrl || imageUrl.includes("svg") ? (
            <ImagePlaceholder />
          ) : (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    borderRadius: 6,
    width: "100%",
    padding: 12,
    display: "flex",
    alignItems: "flex-start",
    borderColor: Colors.grey,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "60%",
  },
  rightColumn: {
    width: "40%",
    alignItems: "flex-end",
  },
  universityName: {
    marginTop: 12,
    fontWeight: "bold",
    color: Colors.black,
    overflow: "hidden",
  },
  address: {
    color: Colors.black,
    overflow: "hidden",
    paddingTop: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Card;
