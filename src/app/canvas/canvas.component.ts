import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fabric } from 'fabric';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private canvas: fabric.Canvas;
  
  constructor(private router: Router) {
    // check login status
    if (localStorage.getItem('user') === null) this.redirectToLogin();
  }
  

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('myCanvas', {
      width: 800,
      height: 800,
      isDrawingMode: true
    });
  }

  changeColor(value: string): void {
    var brush = this.canvas.freeDrawingBrush;
    brush.color = value;
  }

  redirectToLogin(): void {
    this.router.navigate([''], {skipLocationChange: false});
  }
}
