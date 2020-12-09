import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";

// Persistor
import { PersistGate } from "redux-persist/integration/react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from './src/navigation/RootNavigation';

import { Root } from "./src/screens/Root";

// Redux store
import { configureStore } from "./src/store/configureStore";
const { store, persistor } = configureStore();

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text>Loading...</Text>
  </View>
);

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer
              // @ts-ignore
              ref={navigationRef}
            >
              <Root />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;