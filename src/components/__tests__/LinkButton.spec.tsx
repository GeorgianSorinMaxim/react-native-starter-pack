import * as React from "react";
import renderer from "react-test-renderer";

import LinkButton from "../LinkButton";

it(`renders correctly`, () => {
  const defaultProps = {
    label: 'Nandos',
    onPress: () => {},
    isLastOption: false
  };
  const tree = renderer.create(<LinkButton {...defaultProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
