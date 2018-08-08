import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const recipesRoutes: Routes = [
    {
        path: '' ,
        component: RecipesComponent,
        children: [
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
            { path: 'list', component: RecipeListComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },

        ]
    }
];

// Use forChild() since this is a childmodule that gets
// imported to app.module.ts
@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
