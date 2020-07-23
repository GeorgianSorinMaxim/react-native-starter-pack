import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";

import Card from "../components/Card";
import BodyText from "../components/BodyText";
import Colors from "../constants/Colors";
// @ts-ignore
import logo from "../assets/images/logo.jpg";

import { getRestaurants } from "../store/selectors";

import { Restaurant } from "../store/types/state";

interface Props {
	restaurants: Restaurant[] | null
}

interface State {}

export class HomeScreenBase extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  renderItem = (item: Restaurant) => {
    return <Card item={item} />
  }

  render() {
    const restaurantsList = this.props && this.props.restaurants ? this.props.restaurants : [];

    return (
      <View style={styles.screenContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        {restaurantsList.length > 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              data={restaurantsList}
              keyExtractor={({ url }) => url}
              renderItem={({ item }) => this.renderItem(item)}
              style={styles.listContainer}
            />
          </View>
        ) : <BodyText style={styles.centeredText}>No data available</BodyText>}
      </View>
    );
  }
}

// @ts-ignore
HomeScreenBase.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: Colors.white
  },
  listContainer: {
    margin: 12
  },
  centeredText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 100,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  restaurants: getRestaurants(state)
});


export const HomeScreen = connect(
  mapStateToProps,
  null
)(HomeScreenBase);
