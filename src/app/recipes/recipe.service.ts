import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) {}

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
            'Veggie Lasagna',
            'Nice veggie lasagna',
            'https://img.bestrecipes.com.au/rZFo7F8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
            [
                new Ingredient('Minced Mushroom', 500),
                new Ingredient('Tomato Sauce', 2)
            ]
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}

