import { Ingredient } from '../shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    // Since we only provide a copy of the ingredients object
    // we need to emit when new ingredient is added
    ingredientsChanged = new EventEmitter<Ingredient[]>();
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
        // Emit a new copy of the ingredients array after adding
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
