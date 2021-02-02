import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drawCanvas';
  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("signed in");
        // firebase.auth()
        //   .getRedirectResult()
        //   .then((result) => {
        //     if (result.credential) {
        //       /** @type {firebase.auth.OAuthCredential} */
        //       var credential = result.credential;
        //       // ...
        //     }
        //     // The signed-in user info.
        //     var user = result.user;
        //     console.log("inner running");
        //     platformBrowserDynamic().bootstrapModule(AppModule)
        //       .catch(err => console.error(err));
        //   }).catch((error) => {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        //   });
      } else {
        firebase.auth().signInWithRedirect(provider);
        console.log("running");
      }
    })
  }
}
