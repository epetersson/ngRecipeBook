import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('signInForm') signInForm: NgForm;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.signInUser(email, password);
  }

}
