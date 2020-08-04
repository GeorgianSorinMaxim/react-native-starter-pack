import * as React from "react";
import renderer from "react-test-renderer";

import ButtonWithIcon from "../ButtonWithIcon";

it(`renders correctly`, () => {
  const defaultProps = {
    label: 'Google',
    onPress: () => {},
    isLastOption: false
  };
  const tree = renderer.create(<ButtonWithIcon {...defaultProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
