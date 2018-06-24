import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const shoppingListRoutes: Routes = [
    { path: 'shopping-list' , component: ShoppingListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListRoutingModule {

}
