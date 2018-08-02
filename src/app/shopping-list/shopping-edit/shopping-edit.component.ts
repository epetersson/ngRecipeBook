import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Fetching the form from the view using it's identifier #form
  @ViewChild('form') slForm: NgForm;
  editingSubscrition: Subscription;
  editMode = false;
  editedItemIndexId: number;
  itemToEdit: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.editingSubscrition = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndexId = index;
        this.editMode = true;
        this.itemToEdit = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.itemToEdit.name,
          amount: this.itemToEdit.amount
        });
      }
    );
  }

  onSubmit() {
    // Save the value of the form.
    const formValue = this.slForm.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndexId, newIngredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndexId);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.editingSubscrition.unsubscribe();
  }
}
