### React Native app

- Based on https://github.com/expo/create-react-native-app with ejected Expo

### Initial setup

- Install React Native `npm install -g react-native-cli`
- Install xCode from the App Store
- Install Java
- Install Android Studio
- Install from Android Studio a SDK Platform and the Android SDK Tools, Google Play services, Android SDK Platform-Tools, Android Emulator and Android SDK Build-Tools with the same version
- Install Node.js LTS version from the Node.js website
- Install CocoaPods, run `sudo gem install cocoapods`
- Install yarn globally, `sudo npm install yarn -g`
- Install the `git` client
- Clone the project


### Install the app

`$ yarn`

`$ react-native link`

`$ cd ios && pod install`

### Run the app in an iOS / Android simulator

`$ yarn start`

`$ yarn ios`

`$ yarn android`

### Run TypeScript checks

`$ yarn tsc`

### Run the tests

`$ yarn test`

### Run the linter

`$ yarn lint`

### Run Prettier

`$ yarn prettier --write`

### Architecture

- The application state is stored using Redux.
- Login / registration using the Firebase Web SDK.
- redux-saga is used as the Redux middleware for managing the side effects (e.g. data fetching).
- The Redux store is persisted with redux-persist (not necessary the current funcionality of the app, but useful as the application would grow).
- The navigation is done using react-navigation. This library has been added since as the app would grow, there would be a need for navigation fairly quickly.
- Unit tests are written with Jest.
- Reselect (https://github.com/reduxjs/reselect) is used because in a production app because we could compute derived data, allowing Redux to store the minimal possible state.
- Eslint (for TypeScript) is used in the project for checking the JS/TS errors.
- TypeScript is used in the project.
- react-native-vector-icons has been used to improve the UI apprerance using icons in the navigator and in other UI elements.
  - Icons: https://ionicons.com

### Components
- Button
- Button link with icons
- Navigation link
- Hyper link with URLs
- Carousel for images witch caching
- Custom input and text area input
- Custom switch
- Custom dropdown
- Divider for elements
- Multi-purpose modal
- Screen header with title and left / right buttons
- Screen container
- WebView container with `react-native-webview` and `uri-js`
- Progress indicators and spinners with `react-native-progess`

### TODO Integrations
- Analytics (GA) and Crashlytics with `react-native-firebase`, `react-native-device-info` and `react-native-uuid`
- Use biometric authentication and store user creds in the KeyChain and KeyStore with `react-native-secure-key-store` - https://www.freecodecamp.org/news/how-to-implement-secure-biometric-authentication-on-mobile-devices-4dc518558c5c/
- Run the app in different environments: dev, prod, uat with `react-native-config`
- Allow to natively share urls with `react-native-share`
- Internationalization with i18n (`react-native-localize`, `i18n-js`)
- Animate UI elements with `react-native-reanimated`
- Create gradients with `react-native-linear-gradient`
- Display various graph with `victory-native`
- Take pictures with `react-native-camera`
- Render maps with `react-native-maps`
- Render PDFs in-app with `react-native-pdf`
- Ask your users to rate the app with `react-native-rate`
- Feature flagging with Firebase
- Push notifications with Firebase / Azure
- Local notifications

### TODOs before going live
- Manual test the app on multiple devices on both platforms (or use AWS Device Farm).
- Create the app in Play Store and App Store.
- Create signing certificates for iOS.
- Build a CI pipeline using Bitrise or AppCenter.
- Build, sign, archive and upload the app to App Store / Play Store.
- Release for Beta / Internal testing for getting feedback.
- Fix bugs and re-test the app.
- Release the first verion of the app.

### TODOs:
- Cleanup home page
- Add a loader component for the initial fetch by using a loading flag in Redux that's initially set to true. Once the data is fetch the flag is set to false. While the flag is true, render the loader, otherwise render the data or the placeholder

- Login / Regiser: Add image on background like on Harrod's app and validation
- WebViewInModal & other unused components
- Write and improve tests (e.g. for /components, networkingApi.js and for the navigator)
- Improve and extend the typings (see the TODOs placed in the code) and transform networkingApi.js and useLinking.js into .tsx




