import * as React from "react";
import { connect } from "react-redux";

import { MainNavigator } from "../navigation/MainNavigator";
import { NotLoggedInNavigator } from "../navigation/NotLoggedInNavigator";

interface Props {
  login?: {
    isAuthenticating: boolean;
    loginInfo: {
      token: string;
      expDate: string;
    };
  };
}

export class RootBase extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { login } = this.props;
    return login && !login.isAuthenticating && login.loginInfo ? <MainNavigator /> : <NotLoggedInNavigator />;
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export const Root = connect(mapStateToProps, null)(RootBase);
