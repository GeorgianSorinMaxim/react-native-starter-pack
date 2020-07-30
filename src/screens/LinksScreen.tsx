import * as React from "react";
import { Linking, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import LinkButton from "../components/LinkButton";

const LinksScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <LinkButton
        label="Google"
        onPress={() => Linking.openURL("https://www.google.com")}
        isLastOption={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
});

export default LinksScreen