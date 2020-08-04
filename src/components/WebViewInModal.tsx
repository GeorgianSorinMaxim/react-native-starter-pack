// import React, { Component } from "react"
// import { Modal, StatusBar, StyleSheet, Text, View } from "react-native"
// import { WebView, WebViewNavigation } from "react-native-webview"
// import {
//   WebViewError,
//   WebViewErrorEvent,
//   WebViewNavigationEvent,
//   WebViewProgressEvent,
// } from "react-native-webview/lib/WebViewTypes"
// import { parse } from "uri-js"

// import { BodyText, Header, Button, Screen } from "../components"
// import { ButtonOptions as HeaderButtonOptions } from "../components/Header"

// interface Props {
//   uri?: string | null
//   onClose: () => void
//   onWebViewStateChange: (event: WebViewNavigation) => void
// }

// interface State {
//   error: boolean
//   loading: boolean
// }

// type OnLoadEnd = WebViewNavigationEvent | WebViewErrorEvent

// const isWebViewErrorEvent = (event: OnLoadEnd): event is WebViewErrorEvent =>
//   isNumber((event.nativeEvent as WebViewError).code)

// class WebViewInModal extends Component<Props, State> {
//   public state: State = {
//     error: false,
//     loading: true,
//   }

//   private webview: React.RefObject<any> = React.createRef()

//   private onLoadProgress = ({ nativeEvent: { loading } }: WebViewProgressEvent) => this.setState({ loading })

//   private onLoadEnd = (event: WebViewNavigationEvent | WebViewErrorEvent) => {
//     this.setState({ loading: false })

//     if (isWebViewErrorEvent(event)) {
//       const { code, url } = event.nativeEvent

//       if ((!url || url === '') && code) {
//         this.setState({ error: true })
//       }
//     }
//   }

//   private onRetry = () => {
//     this.setState({ error: false, loading: true })

//     if (this.webview && this.webview.current) {
//       this.webview.current.reload()
//     }
//   }

//   private onCancelPress = () => {
//     const { onClose } = this.props

//     onClose()
//   }

//   public render() {
//     const { uri, onWebViewStateChange } = this.props
//     const { error, loading } = this.state
//     const { host: domain } = parse(toString(uri))

//     const leftButton: HeaderButtonOptions = {
//       title: "Cancel",
//       onPress: this.onCancelPress,
//     }

//     const rightButton: HeaderButtonOptions = {
//       loading: loading || !uri,
//       onPress: () => {},
//     }

//     return (
//       <Screen>
//         <StatusBar backgroundColor="white" barStyle="dark-content" />
//         <Modal transparent={false} animationType="slide" visible>
//           <Header title={domain} leftButton={leftButton} rightButton={rightButton} />
//           {uri && !error ? (
//             <WebView
//               originWhitelist={["*"]}
//               scalesPageToFit
//               bounces={false}
//               ref={this.webview}
//               automaticallyAdjustContentInsets
//               javaScriptEnabled
//               source={{ uri }}
//               onLoadProgress={this.onLoadProgress}
//               onLoadEnd={this.onLoadEnd}
//               onNavigationStateChange={onWebViewStateChange}
//             />
//           ) : null}
//           {error ? (
//             <View style={styles.error}>
//               <Text style={styles.title}>There seems to be a problem</Text>
//               <BodyText>Please check your network connection and try again</BodyText>
//               <Button title="Retry" onPress={this.onRetry} />
//             </View>
//           ) : null}
//         </Modal>
//       </Screen>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//   },
//   loader: {
//     width: 20,
//     paddingRight: 24,
//   },
//   error: {
//     paddingHorizontal: 16,
//     paddingTop: 80,
//     height: "100%",
//     width: "100%",
//   },
//   title: {
//     fontSize: 16,
//     lineHeight: 18,
//     marginTop: 25,
//     marginLeft: 15,
//     marginVertical: 5,
//     alignSelf: "flex-start"
//   }
// });

// export default WebViewInModal;
