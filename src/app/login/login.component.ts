import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public signInText: string;
  constructor(private router: Router, public zone: NgZone, private db: AngularFireDatabase) { 
    this.signInText = 'Sign in with Google';
    this.checkAccount();
  }

  ngOnInit(): void {
    // check login status
    if (localStorage.getItem('user') !== null) this.redirectToCanvas();
  }

  checkAccount(): void {
     // detect change in login status
     firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        localStorage.setItem('user', JSON.stringify(user.uid));
        
        // check if account exists
        var ref = firebase.database().ref();
        ref.once('value')
          .then((snapshot) => {
            var uid = snapshot.val();
            const newUser: string = JSON.stringify(user.uid);
            if (!(newUser in uid.users)) {
              console.log('going to redirect (after async): ', newUser);
              this.db.object('users/' + newUser).update({canvas : "empty"});
            }
            this.redirectToCanvas();
          });
      }
    });
  }

  login(): void {
    // sign in with google
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    this.signInText = 'Retrieving data';
  }

  redirectToCanvas(): void {
    this.zone.run(() => { 
      this.router.navigate(['/canvas'], { skipLocationChange: false }); 
    });
  }
}
