import * as React from "react";
import renderer from "react-test-renderer";

import { SettingsScreenBase } from "../SettingsScreen";

jest.mock("@react-navigation/stack");
jest.mock("@react-navigation/native");
jest.mock("@react-navigation/bottom-tabs");

describe("SettingsScreen", () => {
  it(`renders the SettingsScreen screen`, () => {
    const defaultProps = {
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn(),
      },
      logout: jest.fn(),
      user: {
        id: "123",
        email: "test@test.com",
        firstName: "John",
        lastName: "Doe",
      },
    };

    // @ts-ignore
    const tree = renderer.create(<SettingsScreenBase {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
