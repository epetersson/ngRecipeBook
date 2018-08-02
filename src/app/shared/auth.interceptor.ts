import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/switchMap"
import "rxjs/add/operator/take"
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "../auth/store/auth.reducers";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        console.log('Intercepted!', req);

        // SwitchMap is used because it does not wrap the returned value in a new value,
        // but instead it returns the value directly which is already an Observable
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.State) => {
            const clonedReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(clonedReq);
        });
    }
}