import * as AuthActions  from './../store/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    
    // Dispatching the emal and password to the trysignup action
    this.store.dispatch(new AuthActions.TrySignUpUser({email: email, password: password}));
  }

}
