import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpRequest, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private httpService: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        /* return this.httpService.put(
            'https://ng-recipe-book-55fbc.firebaseio.com/recipes.json,
            this.recipeService.getRecipes()
        ); */

        const req = new HttpRequest('PUT', 'https://ng-recipe-book-55fbc.firebaseio.com/recipes.json', this.recipeService.getRecipes());
        return this.httpService.request(req);
    }

    getRecipes() {
        // Here we use the mapper to add an empty ingredients array to a recipe
        // not containing any recipes.
        return this.httpService.get<Recipe[]>('https://ng-recipe-book-55fbc.firebaseio.com/recipes.json')
            .pipe(map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe( (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
