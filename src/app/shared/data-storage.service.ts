import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private httpService: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.httpService.put(
            'https://ng-recipe-book-55fbc.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipes()
        );
    }

    getRecipes() {
        const token = this.authService.getToken();
        console.log(token);
        // Here we use the mapper to add an empty ingredients array to a recipe
        // not containing any recipes.
        return this.httpService.get('https://ng-recipe-book-55fbc.firebaseio.com/recipes.json?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
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
