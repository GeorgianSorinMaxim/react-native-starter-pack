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

$ `yarn`

$ `react-native link`

$ `cd ios && pod install`

### Run the app in an iOS / Android simulator

$ `yarn start`

$ `yarn ios`

$ `yarn android`

### Run TypeScript checks

$ `yarn tsc`

### Run the tests

$ `yarn test`

### Run the linter

$ `yarn lint`

### Run Prettier

$ `yarn prettier --write`

### Architecture

- The application state is stored using Redux.
- `redux-saga` is used as the Redux middleware for managing the side effects (e.g. data fetching, login flow, etc).
- The Redux store is persisted with `redux-persist`. This capability is not necessary for the current functionality of the app, but useful as the application would grow.
- The login / registration flow is implemented with `react-native-firebase`.
- The navigation is done using `react-navigation`. This library has been added since as the app would grow, there would be a need for navigation fairly quickly.
- TypeScript is used in the project with strict rules and no usage for `@ts-ignore`.
- ESLint (for TypeScript) is used in the project for checking the JS/TS errors.
- `react-native-vector-icons` is used for improving the UI look-and-feel using icons in the navigator and in other UI elements.
  - Icons used: https://infinitered.github.io/ionicons-version-3-search/
- Environment variables are managed with `react-native-config`.
- The device info is managed with `react-native-device-info` and `react-native-uuid`.
- Images are cached in the app with `react-native-fast-image`.
- Reselect (https://github.com/reduxjs/reselect) should used because in a production app because we could compute derived data, allowing Redux to store the minimal possible state.

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
- Screen container

### Changelog

- DONE in July 2022

  - Upgraded `react`, `react-native` & other dependencies
  - Enabled Hermes
  - Added `react-native-firebase`
  - Made the TS rules strict (e.g. turn on rules like `noImplicitAny`, no `@ts-ignroe` or `: any` types) and fixed all TS issues
  - Added auto-login with token verification with `jwt-decode`
  - Refactored `/screens` and `/components` to use hooks and functional components
  - Improved and extended the types and transformed `networkingApi.js` into `.ts`
  - Added progress indicators and spinners with `react-native-progress`
  - Added `react-native-config`
  - Added logging with Crashlytics

### WIP features and improvements

- Test logging service
- Login / Register screen: Add image on background like on Harrods's app and validation
  - UI improvements with `react-native-keyboard-aware-scroll-view`
- Build a CI with AppCenter CI to build and sign the app
- Add CodePush for over-the-air updates
- Create a design system with small components for Text, Heading, Subheading, Divider, Loader, etc
  - Use `TextAreaWithLabel` + `PhoneNumberPrefix` + `OptionSwitch` + `HyperLink` + `GenericModal` + `Dropdown`
- Add a WebView container with `react-native-webview` and `uri-js`
- Run the app in different environments: dev, prod, uat with `react-native-config`
- Add feature flagging + A/B testing capabilities with Firebase Remote Config + Firebase Realtime Database using with `react-native-firebase`
- Render SVGs with `react-native-svg` and `react-native-svg-transformer`
- Add push notifications with Firebase / Azure / Iterable
- Replace `Jest` with `react-native-testing-library` and write tests (e.g. for /components, networkingApi.js and for the navigator)
- Add `pre-commit` hooks
- Add tracking service with Analytics (GA) and `react-native-firebase`

- Use biometric authentication and store user credentials in the KeyChain and KeyStore with `react-native-secure-key-store`
- Animate UI elements with `react-native-reanimated`
- Ask your users to rate the app with `react-native-rate`
- Allow to natively share urls with `react-native-share`
- Create gradients with `react-native-linear-gradient`
- Take pictures with `react-native-camera`
- Render maps with `react-native-maps`
- Render PDFs in-app with `react-native-pdf`
- Internationalization with i18n (`react-native-localize`, `i18n-js`)
- Display various graph with `victory-native`
- Local notifications
- Spike Apollo Client
  - Manage manage the local data using Apollo Client (with apollo-link-state)
  - Access the Apollo cache with apollo-cache-inmemory

### TODOs before going live

- Manual test the app on multiple devices on both platforms (or use AWS Device Farm).
- Create the app in Play Store and App Store.
- Create signing certificates for iOS.
- Build a CI pipeline using Bitrise or AppCenter.
- Build, sign, archive and upload the app to App Store / Play Store.
- Release for Beta / Internal testing for getting feedback.
- Fix bugs and re-test the app.
- Release the first verion of the app.

### Code quality:

- Re-use code whenever possible
- Use functional components (not class components) since Hooks allows us to use state inside functional components
- Have strict TS rules
- Run Prettier, lint and TS in all files (including tests)
- Use type declarations for dependencies (e.g. `react-native`)
- Write unit tests using `react-native-testing-library`
- Write E2E tests
- Use pre-hooks, Git checks and checks on the CI
- Document the app (how to get started, important architectural decisions, etc)
- Use PR templates and a CHANGELOG.MD
- Use an UAT app against multiple envs
- Have a logging service (GA / Bugsnag)
- Keep the dependencies updated
- Integrate Crashlytics
- Built a CI (Bitrise + CodePush)
  - Fully automate release from Bitrise
