import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.authService.signUpUser(email, password);
  }

}
