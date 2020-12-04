import * as React from "react";
import { connect } from "react-redux";

import { MainNavigator } from "../navigation/MainNavigator";
import { NotLoggedInNavigator } from "../navigation/NotLoggedInNavigator";

interface Props {
  user?: {
    id: string;
    email: string;
  };
}

export class RootBase extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return user && user.id ? <MainNavigator /> : <NotLoggedInNavigator />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export const Root = connect(mapStateToProps, null)(RootBase);
