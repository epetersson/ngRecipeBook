import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    getIngredients() {
        // Slice to return only a copy of ingredients, not the array itself
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        // Next a new copy of the ingredients array to the Subject after adding ingredient
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // ... is a spread operator that pushes all of the elements in
        // the ingredients array
        this.ingredients.push(...ingredients);
        // Next a new copy of the ingredients array to the Subject after adding ingredient
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
