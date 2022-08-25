import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import { getNewsArticles } from "../store/selectors";

import { Box, Carousel, BodyText, Article } from "../components";

import { NewsArticle } from "../types/api-types";

import { StringValues } from "../constants/StringValues";

export const NewsScreen = () => {
  const images = ["", ""];

  const news = useSelector(getNewsArticles);

  const renderItem = (item: NewsArticle) => <Article item={item} />;

  return (
    <Box flex={1} backgroundColor="white">
      <Carousel data={images} height={200} />
      {news.length > 0 ? (
        <Box paddingTop="large" paddingBottom="large">
          <FlatList
            data={news}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => renderItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      ) : (
        <Box marginTop="large" alignItems="center">
          <BodyText size="large">{StringValues.noDataAvailable}</BodyText>
        </Box>
      )}
    </Box>
  );
};
