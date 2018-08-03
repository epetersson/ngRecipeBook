import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    
    // ofType allows us to check if the action is of a certain type.
    // if the action does not lead to an new action in the end, use @Effect(dispatch: false)
    // if ou return 1 action, use map, otherwise mergemap
    @Effect()
    authSignUp = this
        .actions$.ofType(AuthActions.TRY_SIGN_UP_USER)
            .map((action: AuthActions.TrySignUpUser) => {
                return action.payload
            })
            .switchMap((authData: {email: string, password: string}) => {
                return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
            })
            .switchMap(() => {
                return fromPromise(firebase.auth().currentUser.getIdToken());
            })
            // mergemap merges the returning array to observables
            .mergeMap((token: string) => {
                return [
                    {
                        type: AuthActions.SIGN_UP_USER
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ]
            }); 
    
    @Effect()
    authSignIn = this.actions$
        .ofType(AuthActions.TRY_SIGN_IN_USER)
        .map((action: AuthActions.TrySignInUser) => {
            return action.payload
        })
        .switchMap((authData: {email: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        // mergemap merges the returning array to observables
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGN_IN_USER
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        });
    
    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.SIGN_OUT_USER)
        .do(() => {
            this.router.navigate(['/']);
        });

    constructor(private actions$: Actions, private router: Router) {}

}