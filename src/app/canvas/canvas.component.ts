import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private canvas: fabric.Canvas;
  private userID: string;
  public toggleText: string;
  public CANVAS_WIDTH: number;
  public CANVAS_HEIGHT: number;
  public IMAGE_SCALE_WIDTH: number;
  public IMAGE_SCALE_HEIGHT: number;

  constructor(private router: Router, private db: AngularFireDatabase, public zone: NgZone) {
    // check login status
    this.CANVAS_WIDTH = 1600;
    this.CANVAS_HEIGHT = 1000;
    this.IMAGE_SCALE_WIDTH = 500;
    this.IMAGE_SCALE_HEIGHT = 500;
    this.toggleText = "Turn off Drawing Mode to Edit Image";
    this.loginSetup();
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('myCanvas', {
      width: this.CANVAS_WIDTH,
      height: this.CANVAS_HEIGHT,
      isDrawingMode: true
    });

    
    // save for mouse:up because a drawing is done only when the mouse is up
    this.canvas.on('mouse:up', () => {
      this.db.object('users/' + this.userID).update({canvas : JSON.stringify(this.canvas)});
    });
  }

  // add image to the canvas
  addImage(event: Event): void {
    const eventObj: HTMLInputElement = <HTMLInputElement> event.target;
    if (eventObj !== null) {
      const reader = new FileReader(); 
      var image = new Image();
      
      // runs after loading the image file
      reader.onload = () => {
        // load the image content into Image() object
        if (reader.result !== null) {
          image.src = <string> reader.result;
        }
      };
      
      // runs after the image object is loaded
      image.onload = () => {
        var canvasImage = new fabric.Image(image, {
        });
        canvasImage.scaleToHeight(this.IMAGE_SCALE_HEIGHT);
        canvasImage.scaleToWidth(this.IMAGE_SCALE_WIDTH);
        this.canvas.add(canvasImage);
        this.db.object('users/' + this.userID).update({canvas : JSON.stringify(this.canvas)});
      };

      // load the image file
      if (eventObj.files !== null) {
        reader.readAsDataURL(eventObj.files[0]); 
      }
    }
  }

  // onChange function that changes stroke color
  changeColor(value: string): void {
    var brush = this.canvas.freeDrawingBrush;
    brush.color = value;
  }

  loginSetup(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.userID = user.uid;
        this.retrieveCanvas();
      } else {
        this.redirectToLogin();
      }
    });
  }

  // turn on/off Drawing Mode
  toggleDrawing(): void {
    if (this.canvas.isDrawingMode == true) {
      this.toggleText = "Turn on Drawing Mode to keep Drawing";
      this.canvas.isDrawingMode = false;
    } else {
      this.toggleText = "Turn off Drawing Mode to Edit Image";
      this.canvas.isDrawingMode = true;
    }
  }

  redirectToLogin(): void {
    this.zone.run(() => {
      this.router.navigate([''], {skipLocationChange: false});
    });
  }

  // retrieve canvas from database
  retrieveCanvas(): void {
    var ref = firebase.database().ref('users/' + this.userID);
      ref.once('value')
        .then((snapshot) => {
          var uid = snapshot.val();
          if (uid.canvas != "empty") {
            this.canvas.loadFromJSON(uid.canvas, () => {
              this.canvas.renderAll();
            });
          }
        });
  }
}
