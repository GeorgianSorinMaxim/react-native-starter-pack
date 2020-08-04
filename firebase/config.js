import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUPyBlNr8GcTtemspFZ23Y1BDFLzYRn0E",
  authDomain: "reactnative-43696.firebaseapp.com",
  databaseURL: "https://reactnative-43696.firebaseio.com/",
  projectId: "reactnative-43696",
  storageBucket: "gs://reactnative-43696.appspot.com",
  messagingSenderId: "864491570252",
  appId: "1:864491570252:ios:6217f0f5fb532df700e0e9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };