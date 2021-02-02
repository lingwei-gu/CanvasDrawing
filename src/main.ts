import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import firebase from "firebase/app";
import "firebase/auth";

if (environment.production) {
  enableProdMode();
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBRsqkrHPe52LD9lbd6pgobwCE64WwzmFI",
  authDomain: "canvasdrawing-6a528.firebaseapp.com",
  databaseURL: "https://canvasdrawing-6a528-default-rtdb.firebaseio.com",
  projectId: "canvasdrawing-6a528",
  storageBucket: "canvasdrawing-6a528.appspot.com",
  messagingSenderId: "53124351350",
  appId: "1:53124351350:web:87e70c6212c93e45b9a657",
  measurementId: "G-D1151PK1PB"
};

firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();
//var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("signed in");
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  } else {
    firebase.auth().signInWithRedirect(provider);
    console.log("running");
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("inner running");
        platformBrowserDynamic().bootstrapModule(AppModule)
          .catch(err => console.error(err));
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
})





