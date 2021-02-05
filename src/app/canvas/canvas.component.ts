import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fabric } from 'fabric';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private canvas: fabric.Canvas;
  public toggleText: string;
  public CANVAS_WIDTH: number;
  public CANVAS_HEIGHT: number;
  public IMAGE_SCALE_WIDTH: number;
  public IMAGE_SCALE_HEIGHT: number;

  constructor(private router: Router, private db: AngularFireDatabase) {
    // check login status
    this.CANVAS_WIDTH = 1600;
    this.CANVAS_HEIGHT = 1000;
    this.IMAGE_SCALE_WIDTH = 500;
    this.IMAGE_SCALE_HEIGHT = 500;

    if (localStorage.getItem('user') === null) this.redirectToLogin();
    console.log('ctor' + localStorage.getItem('user'));
    this.toggleText = "Turn off Drawing Mode to Edit Image";
  }

  ngOnInit(): void {
    const userInfo: Observable<any> = this.db.object('users').valueChanges();
    userInfo.subscribe((user) => {
      console.log(user['userID']);
    });

    this.canvas = new fabric.Canvas('myCanvas', {
      width: this.CANVAS_WIDTH,
      height: this.CANVAS_HEIGHT,
      isDrawingMode: true
    });

    this.retrieveCanvas();
    // save for mouse:up because a drawing is done only when the mouse is up
    this.canvas.on('mouse:up', () => {
      console.log('mouse up');
      this.db.object('users/' + localStorage.getItem('user')).update({canvas : JSON.stringify(this.canvas)});
    });
  }

  // retrieve canvas from database
  retrieveCanvas(): void {
    var ref = firebase.database().ref('users/' + localStorage.getItem('user'));
      ref.once('value')
        .then((snapshot) => {
          var uid = snapshot.val()
          if (uid.canvas != "empty") {
            console.log('get canvas');
            this.canvas.loadFromJSON(uid.canvas, () => {
              this.canvas.renderAll();
            });
          }
        });
  }

  // onChange function that changes stroke color
  changeColor(value: string): void {
    var brush = this.canvas.freeDrawingBrush;
    brush.color = value;
    console.log("color changed");
  }

  // add image to the canvas
  addImage(event: Event): void {
    console.log(event);
    const eventObj: HTMLInputElement = <HTMLInputElement> event.target
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
        this.db.object('users/' + localStorage.getItem('user')).update({canvas : JSON.stringify(this.canvas)});
        console.log("db update image");
      };

      // load the image file
      if (eventObj.files !== null) {
        reader.readAsDataURL(eventObj.files[0]); 
      }
    }
  }

  // turn on/off Drawing Mode
  toggleDrawing(): void {
    if (this.canvas.isDrawingMode == true) {
      this.toggleText = "Turn on Drawing Mode to keep Drawing"
      this.canvas.isDrawingMode = false
    } else {
      this.toggleText = "Turn off Drawing Mode to Edit Image";
      this.canvas.isDrawingMode = true;
    }
  }

  redirectToLogin(): void {
    this.router.navigate([''], {skipLocationChange: false});
  }
}
