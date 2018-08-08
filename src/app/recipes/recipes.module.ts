import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/recipe.reducers';
import { RecipeEffects } from './store/recipe.effects';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeSearchComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes', recipeReducer), //forFeature is used for lazy loading. Tells RXjs to add this lazy loaded module once it's been included in the application
        EffectsModule.forFeature([RecipeEffects]),
        FormsModule,
    ]
})
export class RecipesModule {}
