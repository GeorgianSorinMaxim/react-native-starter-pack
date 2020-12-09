import * as React from "react";
import { AppState, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import Colors from "../constants/Colors";
import { BodyText, Card } from "../components";

import { getRestaurants } from "../store/selectors";
import { University } from "../store/types/state";

import { actions as AppActions } from "../store/actions/app";
import { actions as LoginActions } from "../store/actions/login";

type Props = {
  restaurants: University[] | null;
  appStateUpdated: (prevState, newState) => void;
  validateToken: () => void;
};

type State = {
  appState: string;
};
export class HomeScreenBase extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    console.log(`state changes`, nextAppState);

    this.props.appStateUpdated(this.state.appState, nextAppState);

    if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
      this.props.validateToken();
    }

    this.setState({ appState: nextAppState });
  };

  renderItem = (item: University) => {
    return <Card item={item} />;
  };

  render() {
    const restaurantsList = this.props && this.props.restaurants ? this.props.restaurants : [];

    return (
      <View style={styles.screenContainer}>
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
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  listContainer: {
    marginHorizontal: 12,
  },
  centeredText: {
    fontSize: 16,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  restaurants: getRestaurants(state),
});

const mapDispatchToProps = (dispatch) => ({
  validateToken: () => dispatch(LoginActions.validateToken()),
  appStateUpdated: (prevState, newState) => dispatch(AppActions.appStateUpdated(prevState, newState)),
});

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(HomeScreenBase);
