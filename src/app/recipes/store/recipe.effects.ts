import { ApiSearch } from '../../shared/search.model';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import { switchMap, withLatestFrom, map, catchError, mergeMap } from "rxjs/operators";
import { Recipe } from '../recipe.model';
import { Store, Action } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { of } from '../../../../node_modules/rxjs';

export class EffectError implements Action {
    readonly type = '[Error] Effect Error';
}

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

    @Effect()
    recipesFetchFromAPI = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES_FROM_API),
        switchMap((action: RecipeActions.FetchRecipesFromApi) => {
            const params = new HttpParams().set('q', action.payload).set('to', '100');
            return this.httpClient.get<ApiSearch>('https://api.edamam.com/search', { params: params }).pipe(
                catchError((error) => {
                    console.log('Error fetching recipes from API', error);
                    return of({})
                })
            )
        } 
        ),
        map(
            (searchResult: ApiSearch) => {
                console.log(searchResult);
                console.log(searchResult.hits)
                return {
                    type: RecipeActions.STORE_RECIPES_FROM_API,
                    payload: { recipes: searchResult.hits, searchQuery: searchResult.q }
                }
            }
        )
    )

    /*     @Effect()
        recipesFetchFromAPI = this.actions$
            .ofType(RecipeActions.FETCH_RECIPES_FROM_API)
            .pipe(switchMap((action: RecipeActions.FetchRecipesFromApi) => {
                return this.httpClient.get<ApiSearch>('https://api.edamam.com/search').pipe(
                    catchError((error) => {
                        console.log('Error fetching recipes from API', error);
                        return of({})
                    }))
                }),
                map(
                    (searchResult) => {
                        console.log(searchResult);
                        return {
                            type: RecipeActions.SET_RECIPES,
                            payload: searchResult.hits
                        }
                    }
                )
            );
         */
    /* WithLatestFrom allows for combining the value that is fetched in the previous statement, 
    with another observables value. I.E, the action and combined with the state in this case */
    @Effect({ dispatch: false })
    recipesStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const req = new HttpRequest('PUT', 'https://ng-recipe-book-55fbc.firebaseio.com/recipes.json', state.recipes);
                return this.httpClient.request(req);
            })
        )

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}