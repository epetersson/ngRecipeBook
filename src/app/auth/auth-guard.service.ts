import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>) { }

    /* 
    store.select() sets up an ongoing subscription to the store and whenever the state is changed, it will fire.
    This is why take(1) is being used, to make sure that the value is only fetched once.
    */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .pipe(
                take(1),
                map((authState: fromAuth.State) => {
                    return authState.authenticated;
                })
            );
    }
}
