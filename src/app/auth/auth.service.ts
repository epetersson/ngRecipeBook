import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as fromApp from '../store/app.reducers';
import * as authActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            user => {
                this.store.dispatch(new authActions.SignUpUser());
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => {
                            console.log(token);
                            this.store.dispatch(new authActions.SetToken(token));
                        }
                    );
            }
        )
        .catch((error: Error) => console.log(error)
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.store.dispatch(new authActions.SignInUser());
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                console.log(token);
                                this.store.dispatch(new authActions.SetToken(token));
                            }
                    );
                }
            )
            .catch(
                (error: Error) => console.log(error)
            );
    }

    signOutUser() {
        firebase.auth().signOut();
        this.store.dispatch(new authActions.SignOutUser());
        this.router.navigate(['/']);
    }
}
