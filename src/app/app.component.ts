import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Sets up the connection to firebase once the app starts
    firebase.initializeApp({
      apiKey: "AIzaSyAXyJxmtC26B7HP-hGmRbQ337R0z7DaJzw",
      authDomain: "ng-recipe-book-55fbc.firebaseapp.com"
    });
  }
}
