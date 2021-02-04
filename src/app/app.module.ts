import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';


import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'canvas', component: CanvasComponent},
  {path: 'login', component: LoginComponent}
];

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

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


