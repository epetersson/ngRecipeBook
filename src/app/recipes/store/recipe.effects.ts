import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom, map } from "rxjs/operators";
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipesFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://ng-recipe-book-55fbc.firebaseio.com/recipes.json')
            }),
            map(
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
        );
    
    /* WithLatestFrom allows for combining the value that is fetched in the previous statement, 
    with another observables value. I.E, the action and combined with the state in this case */
    @Effect({dispatch: false})
    recipesStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const req = new HttpRequest('PUT', 'https://ng-recipe-book-55fbc.firebaseio.com/recipes.json', state.recipes);
                return this.httpClient.request(req);
            })
        )

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) {}
}
