import * as React from "react";
import renderer from "react-test-renderer";

import LinksScreen from "../LinksScreen";

jest.mock("@react-navigation/stack");
jest.mock("@react-navigation/native");
jest.mock("@react-navigation/bottom-tabs");
jest.mock("react-native-gesture-handler");

describe("LinksScreen", () => {
  it(`renders the LinksScreen screen`, () => {
    const tree = renderer.create(<LinksScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
