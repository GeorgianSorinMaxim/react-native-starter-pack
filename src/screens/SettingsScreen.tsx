import * as React from "react";
import { connect } from "react-redux";
import { Linking, View, StyleSheet } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";

import { BodyText, ButtonWithIcon, Divider, Title, Screen } from "../components";
import Colors from "../constants/Colors";

import { actions as LoginActions } from "../store/actions/login";
import { getUser } from "../store/selectors";

import { contact } from "../utils/contact";

type OwnProps = {
  logout: () => void;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
};
type Props = OwnProps & NavigationInjectedProps;

export class SettingsScreenBase extends React.Component<Props> {
  state = {
    bundleId: "",
    buildNumber: "",
    version: "",
    readableVersion: "",
    systemName: "",
    ip: "",
    osVersion: "",
    uuid: "",
  };

  async componentDidMount() {
    await this.getDeviceData();
  }

  getDeviceData = async () => {
    try {
      const bundleId = await DeviceInfo.getBundleId();
      const buildNumber = await DeviceInfo.getBuildNumber();
      const version = await DeviceInfo.getVersion();
      const readableVersion = await DeviceInfo.getReadableVersion();
      const systemName = await DeviceInfo.getSystemName();
      const ip = await DeviceInfo.getIpAddress();
      const osVersion = await DeviceInfo.getSystemVersion();
      const id = uuid.v1();

      this.setState({
        bundleId,
        buildNumber,
        version,
        readableVersion,
        systemName,
        ip,
        osVersion,
        uuid: id,
      });
    } catch (e) {
      return console.log("** getDeviceData error");
    }
  };

  onLogout = () => {
    this.props.logout();
  };

  onContact = () => {
    const { bundleId, buildNumber, version, systemName, ip, osVersion, uuid } = this.state;

    const EMAIL = "georgian.maxim@gmail.com";
    const SUBJECT = "I have a question or concern:";
    const BODY = `Please write your question or concern below:\n
      \n\n\n
      ----------------------------\n
      App ID: #${bundleId} \n
      App build number: ${buildNumber} \n
      App version: ${version} \n
      System: ${systemName} \n
      OS: ${osVersion} \n
      IP: ${ip} \n
      UUID: ${uuid} \n
    `;
    contact(EMAIL, SUBJECT, BODY);
  };

  render() {
    return (
      <Screen noHorizontalPadding={true}>
        <View style={styles.container}>
          <Title label="Your details" />
          <Divider />
          <View style={styles.bodyContainer}>
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>Name</BodyText>
              <BodyText style={styles.contentText}>
                {this.props.user.firstName} {this.props.user.lastName}
              </BodyText>
            </View>
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>Email</BodyText>
              <BodyText style={styles.contentText}>{this.props.user.email}</BodyText>
            </View>
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>App version</BodyText>
              <BodyText style={styles.contentText}>{this.state.readableVersion}</BodyText>
            </View>
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>UUID</BodyText>
              <BodyText style={styles.contentText}>{this.state.uuid}</BodyText>
            </View>
          </View>
        </View>

        <ButtonWithIcon
          icon="link"
          label="Terms & Conditions"
          onPress={() => Linking.openURL("http://www.devxldn.com")}
        />
        <ButtonWithIcon icon="mail-outline" label="Contact" onPress={this.onContact} />
        <ButtonWithIcon icon="log-out-outline" label="Logout" onPress={this.onLogout} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  bodyContainer: {
    padding: 24,
  },
  textContainer: {
    paddingVertical: 10,
  },
  headerText: {
    paddingBottom: 4,
    color: Colors.grey,
  },
  contentText: {
    color: Colors.gold,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LoginActions.logout()),
});

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsScreenBase);
