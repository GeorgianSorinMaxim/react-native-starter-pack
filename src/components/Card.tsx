import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
import BodyText from "./BodyText";

import { Restaurant } from "../store/types/state";

interface Props {
  item: Restaurant;
}

interface State {}

class Card extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  onItemTap = (url: string) => {
    Linking.openURL(url).catch((err) => console.warn(err));
  };

  render() {
    const { item } = this.props;
    const { streetAddress, postalCode, addressLocality } = item.geo.address;
    const address = `${streetAddress}, ${postalCode}, ${addressLocality}`;

    return (
      <TouchableOpacity onPress={() => this.onItemTap(item.url)}>
        <View style={styles.item}>
          <BodyText style={styles.restaurantName}>{item.name}</BodyText>
          <BodyText style={styles.address}>{address}</BodyText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 12,
    borderRadius: 6,
    width: "100%",
    backgroundColor: Colors.red,
    padding: 12,
    display: "flex",
    alignItems: "flex-start",
  },
  restaurantName: {
    fontWeight: "bold",
    color: Colors.white,
    overflow: "hidden",
  },
  address: {
    color: Colors.white,
    overflow: "hidden",
    paddingTop: 12,
  },
});

export default Card;
