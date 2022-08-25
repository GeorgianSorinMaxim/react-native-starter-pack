import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  FlatList,
  StyleSheet,
  View,
  AppStateStatus,
} from "react-native";

import { colors } from "../theme";
import { BodyText, Article } from "../components";

import { getNewsArticles } from "../store/selectors";
import { NewsArticle } from "../types/api-types";

import { appActions } from "../store/actions/app";
import { authActions } from "../store/actions/auth";

import { StringValues } from "../constants/StringValues";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  listContainer: {
    marginHorizontal: 12,
  },
  centeredText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const news = useSelector(getNewsArticles);

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

  const renderItem = (item: NewsArticle) => <Article item={item} />;

  return (
    <View style={styles.screenContainer}>
      {news.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={news}
            keyExtractor={({ _id }) => _id}
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
