import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Lasagna',
            'Nice Lasagna',
            'https://img.bestrecipes.com.au/rZFo7F8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
            [
                new Ingredient('Minced Beef', 500),
                new Ingredient('Tomato Sauce', 2)
            ]
        ),
        new Recipe(
            'Bacon Wrapped Chicken',
            'Nice Bacon Wrapped Chicken',
            'https://img.taste.com.au/UCkD8VfP/w1200-h630-cfill/taste/2016/11/chicken-and-prosciutto-parmigiana-79468-1.jpeg',
            [
                new Ingredient('Bacon', 25),
                new Ingredient('Chicken Filét', 5)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'https://img.koket.se/media/flygande-jakob.jpg',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}

