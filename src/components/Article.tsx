import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTime } from "luxon";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { BodyText } from "./BodyText";

import { colors } from "../theme";

import { NewsArticle } from "../types/api-types";
interface Props {
  item: NewsArticle;
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    padding: 12,
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    width: "60%",
  },
  rightColumn: {
    width: "40%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    overflow: "hidden",
  },
  date: {
    fontWeight: "bold",
    color: colors["grey-500"],
    marginVertical: 8,
  },
  source: {
    fontStyle: "italic",
    color: colors["grey-500"],
  },
  summary: {
    color: colors.black,
    overflow: "hidden",
    paddingTop: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export const Article = ({ item }: Props) => {
  const onItemTap = (url: string) => {
    Linking.openURL(url).catch(err => console.warn(err));
  };

  const { title, excerpt, link, media, published_date, rights } = item;

  const date = DateTime.fromJSDate(new Date(published_date));
  const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

  return (
    <TouchableOpacity onPress={() => onItemTap(link)} style={styles.container}>
      <BodyText style={styles.title}>{title}</BodyText>
      <BodyText style={styles.date}>{humanReadable}</BodyText>
      <BodyText style={styles.source}>Source: {rights}</BodyText>
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <BodyText style={styles.summary}>{excerpt}</BodyText>
        </View>
        <View style={styles.rightColumn}>
          {!media || media.includes("svg") ? (
            <ImagePlaceholder />
          ) : (
            <Image source={{ uri: media }} style={styles.image} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
