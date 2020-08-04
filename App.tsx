import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";

// Persistor
import { PersistGate } from "redux-persist/integration/react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import useLinking from "./src/navigation/useLinking";

import { Root } from "./src/screens/Root";

// Redux store
import { configureStore } from "./src/store/configureStore";
const { store, persistor } = configureStore();

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text>Loading...</Text>
  </View>
);

const App = () => {
  const [ isLoadingComplete, setLoadingComplete ] = React.useState(false);
  const [ initialNavigationState, setInitialNavigationState ] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            // @ts-ignore
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Root />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
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