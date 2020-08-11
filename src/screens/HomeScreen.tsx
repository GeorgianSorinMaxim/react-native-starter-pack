import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import Colors from "../constants/Colors";
import { BodyText, Card, Carousel } from "../components";

import { getRestaurants } from "../store/selectors";
import { Restaurant } from "../store/types/state";

interface Props {
  restaurants: Restaurant[] | null;
}
export class HomeScreenBase extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  renderItem = (item: Restaurant) => {
    return <Card item={item} />;
  };

  render() {
    const restaurantsList = this.props && this.props.restaurants ? this.props.restaurants : [];

    const images = [
      "https://i2-prod.manchestereveningnews.co.uk/sport/football/football-news/article18690279.ece/ALTERNATES/s458/0_GettyImages-1254252032.jpg",
      "https://i2-prod.manchestereveningnews.co.uk/sport/football/article18692768.ece/ALTERNATES/s458/0_GettyImages-1227788641.jpg",
    ];

    return (
      <View style={styles.screenContainer}>
        <Carousel data={images} height={200} />

        {restaurantsList.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={restaurantsList}
              keyExtractor={({ url }) => url}
              renderItem={({ item }) => this.renderItem(item)}
              style={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <BodyText style={styles.centeredText}>No data available</BodyText>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: Colors.white,
  },
  listContainer: {
    margin: 12,
  },
  centeredText: {
    fontSize: 16,
    textAlign: "center",
  },
  logo: {
    height: 50,
    width: 100,
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => ({
  restaurants: getRestaurants(state),
});

export const HomeScreen = connect(mapStateToProps, null)(HomeScreenBase);
