import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public zone: NgZone) {
    // check login status
    if (localStorage.getItem('user') !== null) this.redirectToCanvas();
  }

  ngOnInit(): void {
    console.log("login running");
  }

  redirectToCanvas(): void {
    this.zone.run(() => { 
      this.router.navigate(['/canvas'], { skipLocationChange: false }); 
    });
  }

  login() {
    console.log("restart");
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithRedirect(provider);
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

        // save login status
        localStorage.setItem('user', JSON.stringify(user));
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
}
