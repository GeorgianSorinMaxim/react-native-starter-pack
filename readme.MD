### React Native app

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
- react-native-reanimated has been added to the project with the aim of animating components like the restaurant card or the logo.

### TODOs before going live:
- Improve and extend the tests (e.g. for networkingApi.js and for the navigator).
- Improve and extend the typings (see the TODOs placed in the code) and transform networkingApi.js and useLinking.js into .tsx.
- Animate UI elements.