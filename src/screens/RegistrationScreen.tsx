import * as React from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import * as Progress from "react-native-progress";

import { Button, InputWithLabel, NavigationLink, Screen, Title } from "../components";
import Colors from "../constants/Colors";

import { actions as RegistrationActions } from "../store/actions/signup";
import { getRegistrationStatus, getRegistrationError } from "../store/selectors";

interface OwnProps {
  isRegistering: boolean;
  error?: string;
  register: (firstName: string, lastName: string, email: string, password: string) => void;
}

type Props = OwnProps & NavigationInjectedProps;
interface State {
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class RegistrationScreenBase extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isRegistering !== prevProps.isRegistering && this.props.isRegistering === false) {
      this.setState({ firstName: "", lastName: "", password: "", email: "", confirmPassword: "" });
    }
  }

  onLoginLinkPress = () => {
    this.props.navigation.navigate("Login");
  };

  onRegisterPress = () => {
    const { firstName, lastName, email, password, confirmPassword } = this.state;

    if (email === "" || password === "" || confirmPassword === "" || firstName === "" || lastName === "") {
      alert("Please input all your details");
      return;
    }

    if (password !== confirmPassword) {
      alert("The passwords don't match");
      return;
    }

    this.props.register(firstName, lastName, email, password);
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const { isRegistering } = this.props;

    return (
      <Screen>
        <View style={styles.titleContainer}>
          <Title label="New account" />
        </View>

        <InputWithLabel
          hideLabelWhenFocused={true}
          value={firstName}
          onChangeText={(value) => this.setState({ firstName: value })}
          label="First name"
        />
        <InputWithLabel
          hideLabelWhenFocused={true}
          value={lastName}
          onChangeText={(value) => this.setState({ lastName: value })}
          label="Last name"
        />
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
        <InputWithLabel
          hideLabelWhenFocused={true}
          value={confirmPassword}
          onChangeText={(value) => this.setState({ confirmPassword: value })}
          label="Confirm your password"
          secureTextEntry
        />

        <Button disabled={isRegistering} title="REGISTER" onPress={() => this.onRegisterPress()} />

        <NavigationLink text="Already have an account? Login" onPress={this.onLoginLinkPress} />

        {isRegistering ? (
          <Progress.Circle size={24} indeterminate={true} color={Colors.gold} style={styles.loader} />
        ) : null}
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
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => ({
  isRegistering: getRegistrationStatus(state),
  error: getRegistrationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  register: (firstName: string, lastName: string, email: string, password: string) =>
    dispatch(RegistrationActions.register(firstName, lastName, email, password)),
});

export const RegistrationScreen = connect(mapStateToProps, mapDispatchToProps)(RegistrationScreenBase);
