import { HomeComponent } from './core/home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Constant containing all of the routes for the application
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
];

// Module used for routing
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
