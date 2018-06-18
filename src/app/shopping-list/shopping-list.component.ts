import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  private ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // Subscribing to the event of an added ingredients to the array
    this.shoppingListService.ingredientsChanged
      .subscribe( (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

}
