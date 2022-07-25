import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  FlatList,
  StyleSheet,
  View,
  AppStateStatus,
} from "react-native";

import Colors from "../constants/Colors";
import { BodyText, Card } from "../components";

import { getRestaurants } from "../store/selectors";
import { University } from "../store/reducers/data";

import { appActions } from "../store/actions/app";
import { authActions } from "../store/actions/auth";

import { StringValues } from "../constants/StringValues";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector(getRestaurants);

  const appState = useRef(AppState.currentState);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      dispatch(authActions.validateTokenStart());
    }

    dispatch(
      appActions.appStateUpdated({
        prevState: appState.current,
        newState: nextAppState,
      }),
    );
    appState.current = nextAppState;
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState =>
      handleAppStateChange(nextAppState),
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  const renderItem = (item: University) => {
    return <Card item={item} />;
  };

  return (
    <View style={styles.screenContainer}>
      {restaurants.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={restaurants}
            keyExtractor={({ url }) => url}
            renderItem={({ item }) => renderItem(item)}
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <BodyText style={styles.centeredText}>
          {StringValues.noDataAvailable}
        </BodyText>
      )}
    </View>
  );
};

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
