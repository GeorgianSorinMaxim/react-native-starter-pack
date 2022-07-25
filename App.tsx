import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  LogBox,
} from "react-native";
import { Provider } from "react-redux";

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
interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = true;
(
  Text as unknown as TextWithDefaultProps
).defaultProps!.maxFontSizeMultiplier = 1.8;

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = true;
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.maxFontSizeMultiplier = 1.8;

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer ref={navigationRef}>
            <RootStack />
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
