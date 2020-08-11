import * as React from "react";
import renderer from "react-test-renderer";

import TabBarIcon from "../TabBarIcon";

it(`renders correctly`, () => {
  const defaultProps = {
    name: "map",
    focused: true,
  };
  const tree = renderer.create(<TabBarIcon {...defaultProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
