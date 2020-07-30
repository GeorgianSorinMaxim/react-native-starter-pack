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

### Architecture

- The application state is stored using Redux.
- redux-saga is used as the Redux middleware for managing the side effects (e.g. data fetching).
- The Redux store is persisted with redux-persist (not necessary for this task, but useful as the application would grow).
- The navigation is done using react-navigation. This library has been added since as the app would grow, there would be a need for navigation fairly quickly.
- Unit tests are written with Jest.
- Reselect (https://github.com/reduxjs/reselect) is used because in a production app because we could compute derived data, allowing Redux to store the minimal possible state. For the purposses of this assignment Reselect is not useful.
- Eslint (for TypeScript) is used in the project for checking the JS/TS errors.
- TypeScript is used in the project.
- react-native-vector-icons has been used to improve the UI apprerance using icons in the navigator and in other UI elements.

### TODOs before going live:
- Add a loader component for the initial fetch by using a loading flag in Redux that's initially set to true. Once the data is fetch the flag is set to false. While the flag is true, render the loader, otherwise render the data or the placeholder.
- Improve and extend the tests (e.g. for networkingApi.js and for the navigator).
- Improve and extend the typings (see the TODOs placed in the code) and transform networkingApi.js and useLinking.js into .tsx.
- Animate UI elements.
- Manual test the app on multiple devices on both platforms (or use AWS Device Farm).
- Create the app in Play Store and App Store.
- Create signing certificates for iOS.
- Build a CI pipeline.
- Build, sign, archive and upload the app to App Store / Play Store.
- Release for Beta / Internal testing for getting feedback.


TODO: Upgrade React Native, React and other dependencies