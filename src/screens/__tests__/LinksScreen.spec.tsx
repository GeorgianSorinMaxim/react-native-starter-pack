import * as React from "react";
import renderer from "react-test-renderer";

import { SettingsScreenBase } from "../SettingsScreen";

jest.mock("@react-navigation/stack");
jest.mock("@react-navigation/native");
jest.mock("@react-navigation/bottom-tabs");

describe("SettingsScreen", () => {
  it(`renders the SettingsScreen screen`, () => {
    const tree = renderer.create(<SettingsScreenBase />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
