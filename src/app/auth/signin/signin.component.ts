import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('signInForm') signInForm: NgForm;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    
    this.store.dispatch(new AuthActions.TrySignInUser({email: email, password: password}));
  }

}
