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
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));













