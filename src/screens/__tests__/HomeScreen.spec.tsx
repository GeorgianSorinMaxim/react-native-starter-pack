import * as React from "react";
import renderer from "react-test-renderer";

import { HomeScreenBase } from "../HomeScreen";

jest.mock("@react-navigation/stack");
jest.mock("@react-navigation/native");
jest.mock("@react-navigation/bottom-tabs");

describe("HomeScreen", () => {
  it(`renders the HomeScreen screen`, () => {
    const defaultProps = {
      restaurants: [],
    };

    const tree = renderer.create(<HomeScreenBase {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
