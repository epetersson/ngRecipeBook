import { HttpClient } from '@angular/common/http';
import { Effect, Actions } from "@ngrx/effects";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import * as RecipeActions from './recipe.actions';
import { map } from "rxjs/operators";
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipesFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-55fbc.firebaseio.com/recipes.json')
        })
        .map(
            (recipes) => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                }
            }
        )
    
    constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
