import * as React from "react";
import renderer from "react-test-renderer";

import Card from "../Card";

it(`renders correctly`, () => {
  const defaultProps = {
    item: {
      name: "Nando's",
      url: "https://www.nandos.com",
      geo: {
        address: {
          streetAddress: "",
          postalCode: "",
          addressLocality: ""
        }
      }
    }
  };
  const tree = renderer.create(<Card {...defaultProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
