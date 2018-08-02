import { Action } from "@ngrx/store";

export const TRY_SIGN_UP_USER = "TRY_SIGN_UP_USER";
export const SIGN_UP_USER = "SIGN_UP_USER";
export const TRY_SIGN_IN_USER = "TRY_SIGN_IN_USER";
export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const SET_TOKEN = "SET_TOKEN";


export class TrySignUpUser implements Action {
    readonly type = TRY_SIGN_UP_USER;

    constructor(public payload: {email: string, password: string}) {}
}

export class SignUpUser implements Action {
    readonly type = SIGN_UP_USER;
}

export class TrySignInUser implements Action {
    readonly type = TRY_SIGN_IN_USER;

    constructor(public payload: {email: string, password: string}) {}
}

export class SignInUser implements Action {
    readonly type = SIGN_IN_USER;
}

export class SignOutUser implements Action {
    readonly type = SIGN_OUT_USER;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export type AuthActions = 
    SignUpUser | 
    SignInUser | 
    SignOutUser |
    SetToken |
    TrySignUpUser |
    TrySignInUser;