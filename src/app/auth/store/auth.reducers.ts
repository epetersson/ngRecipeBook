import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    
    switch(action.type) {
        case AuthActions.SIGN_UP_USER:
        case AuthActions.SIGN_IN_USER:
            return {
                ...state,
                authenticated: true
            }
        case AuthActions.SIGN_OUT_USER:
            return {
                ...state,
                token: null,
                authenticated: false
            }
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}