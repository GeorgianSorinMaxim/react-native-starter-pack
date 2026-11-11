import { Platform, StatusBar, StyleSheet, LogBox } from "react-native";
import { Provider } from "react-redux";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Loader } from "./src/components";

// Persistor
import { PersistGate } from "redux-persist/integration/react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/RootNavigation";

// Redux store
import { configureStore } from "./src/store/configureStore";
const { store, persistor } = configureStore();

LogBox.ignoreLogs(["Require cycle:"]);
export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardProvider>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer ref={navigationRef}>
              <RootStack />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

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
