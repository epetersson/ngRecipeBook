import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // Subscribing to the event of an added ingredients to the array
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe( (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  // Since we are subscribing to our own subject,
  // we need to unsubscribe to it manually.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
