import React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";

import { StringValues } from "./src/constants/StringValues";

// Persistor
import { PersistGate } from "redux-persist/integration/react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigation, navigationRef } from "./src/navigation/RootNavigation";

// Redux store
import { configureStore } from "./src/store/configureStore";
const { store, persistor } = configureStore();

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text>{StringValues.loading}</Text>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            // TODO: Remove @ts-ignore
            // @ts-ignore
            ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
