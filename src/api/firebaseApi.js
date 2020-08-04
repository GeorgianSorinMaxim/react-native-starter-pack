import { DateTime } from "luxon";

import { firebase } from "../../firebase/config";

export class FirebaseApi {
  constructor() {
    this.isSignedIn = false;

    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.user = {
          email: currentUser.email,
          id: currentUser.uid
        };
      } else {
        this.user = null;
      }
    });
  }

  async login(email, password) {
    if (
      firebase.auth().currentUser &&
      firebase.auth().currentUser.uid
    ) {
      this.user = {
        email: firebase.auth().currentUser.email,
        id: firebase.auth().currentUser.uid
      };
      this.isSignedIn = true;
      return this.user;
    }

    try {
      return await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          const uid = response.user.uid;
          this.user = {
            email: response.user.email,
            id: response.user.uid };
          const usersRef = firebase.firestore().collection("users");

          return usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
              if (!firestoreDocument.exists) {
                alert("User does not exist anymore.");
                throw new Error('User does not exist anymore.');
              }
              const user = firestoreDocument.data();
              this.user = {
                ...this.user,
                firstName: user.firstName,
                lastName: user.lastName
              };

              this.isSignedIn = true;
              return this.user;
            })
            .catch(error => {
              this.isSignedIn = false;
              alert(error);
              return error;
            });
        });
    } catch (error) {
      this.isSignedIn = false;
      alert(error);
      return error;
    }
  }

  async logout() {
    try {
      this.isSignedIn = false;
      this.user = null;

      if (!firebase.auth().currentUser) {
        return "DONE";
      }

      firebase
        .auth()
        .signOut()
        .catch(error => {
          alert(error);
          return error;
        });

      return "DONE";
    } catch (error) {
      alert(error);
      return error;
    }
  }

  async getIdToken() {
    const { currentUser } = firebase.auth();

    if (currentUser) {
      const idTokenResult = await currentUser.getIdTokenResult();
      const expirationTime = DateTime.fromISO(idTokenResult.expirationTime);
      const currentTime = DateTime.local();
      const { minutes } = expirationTime
        .diff(currentTime, "minutes")
        .toObject();
      if (minutes > 2) {
        return idTokenResult.token;
      }
      return await currentUser.getIdToken(true);
    }

    return null;
  }
}

export const firebaseApi = new FirebaseApi();
