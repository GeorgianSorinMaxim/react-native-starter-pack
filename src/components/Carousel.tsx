import React, { Component } from "react";
import { Dimensions, FlatList, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

interface Props {
  data: string[]
  height: number
}

type State = {
  visibleItem: number
};

type CarouselImage = {
  index: number
  item: string
};

type ImageHeight = {
  height: number
}

const WIDTH = Dimensions.get("window").width;
const keyExtractor = (item: string, index: number) => `${item} ${index}`;
const ImagePlaceholder = (props: ImageHeight) => (
  <View style={[ { height: props.height }, styles.imagePlaceholder]} >
    <Icon name="image-outline" color={Colors.grey} size={50} />
  </View>
);

class Carousel extends Component<Props, State> {
  state = {
    visibleItem: 0
  };

  handleScroll = (e: NativeSyntheticEvent<any>) => {
    const { data } = this.props;
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    const itemNumFromOffset = Math.floor(contentOffset.x / viewSize.width);
    const itemNum = Math.min(Math.max(0, itemNumFromOffset), data.length - 1);

    this.setState({
      visibleItem: itemNum
    });
  }

  renderItem = ({ item }: CarouselImage) => {
    return item ? (
      <View style={styles.elementContainer}>
        <FastImage
          style={[styles.image, { height: this.props.height }]}
          source={{
            uri: item,
            priority: FastImage.priority.high,
          }}
          key={item}
        />
      </View>
    ) : <ImagePlaceholder height={this.props.height} />;
  }

  renderCurrentItemIndicators = () => {
    const { data } = this.props;
    const textInputComponents = data.map(
      (item, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            this.state.visibleItem !== index ? styles.inactive : null,
          ]}
        />
      )
    );

    return textInputComponents;
  }

  render = () => {
    const { data } = this.props;

    if (!data) {
      <ImagePlaceholder height={this.props.height} />;
    }

    return (
      <View>
        <FlatList
          horizontal
          data={data}
          pagingEnabled
          keyExtractor={keyExtractor}
          renderItem={this.renderItem}
          scrollEnabled={data.length > 1}
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={() => {}}
          onScroll={this.handleScroll}
        />
        {data.length > 0 ? (
          <View style={styles.currentItemIndicatorContainer}>{this.renderCurrentItemIndicators()}</View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementContainer: {
    width: WIDTH,
    alignItems: "center",
    overflow: "visible",
    justifyContent: "space-between",
  },
  image: {
    width: WIDTH,
  },
  currentItemIndicatorContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: Colors.grey,
  },
  inactive: {
    opacity: 0.4,
  },
  imagePlaceholder: {
    width: WIDTH,
    backgroundColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Carousel;
