import * as React from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import * as Progress from 'react-native-progress';

import { Button, InputWithLabel, NavigationLink, Screen, Title } from "../components";
import Colors from "../constants/Colors";

import { actions as LoginActions } from '../store/actions/login';
import { getLoginStatus, getLoginError } from "../store/selectors";

interface OwnProps {
  isLogging: boolean,
  error?: string,
  login: (email: string, password: string) => void
}

interface State {
  password: string,
  email: string,
}

type Props = OwnProps & NavigationInjectedProps

export class LoginScreenBase extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.isLogging !== prevProps.isLogging && this.props.isLogging === false) {
      this.setState({ password: '', email: '' });
    }
  }

  onRegistrationLinkPress = () => {
    this.props.navigation.navigate('Registration')
  }

  onLoginPress = () => {
    const { email, password } = this.state;

    if (email === '' || password === '') {
      alert("Please input your email and password");
      return;
    }

    this.props.login(email, password);
  }

  render() {
    const { password, email } = this.state;
    const { isLogging } = this.props;

    return (
      <Screen>
        <View style={styles.titleContainer} >
          <Title label="Login" />
        </View>

        <InputWithLabel
          hideLabelWhenFocused={true}
          value={email}
          onChangeText={(value) => this.setState({ email: value })}
          label="Email"
        />
        <InputWithLabel
          hideLabelWhenFocused={true}
          value={password}
          onChangeText={(value) => this.setState({ password: value })}
          label="Password"
          secureTextEntry
        />

        <Button
          disabled={isLogging}
          title={"LOGIN"}
          onPress={() => this.onLoginPress()}
        />

        <NavigationLink text="New? Create account" onPress={this.onRegistrationLinkPress} />

        {isLogging ? <Progress.Circle size={24} indeterminate={true} color={Colors.gold} style={styles.loader} /> : null}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 100,
    paddingBottom: 12,
  },
  loader: {
    paddingVertical: 24,
    alignSelf: "center"
  }
});

const mapStateToProps = state => ({
  isLogging: getLoginStatus(state),
  error: getLoginError(state),
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) =>
    dispatch(LoginActions.login(email, password)),
});

export const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenBase);
