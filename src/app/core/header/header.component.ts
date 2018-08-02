import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers'
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor (private dataStorageService: DataStorageService,
                 private authService: AuthService,
                 private store: Store<fromApp.AppState>) {}
                 
    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onSignOutUser() {
        this.authService.signOutUser();
    }
}
