import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

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
  itemToEdit: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.editingSubscrition = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.itemToEdit = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.itemToEdit.text,
            amount: this.itemToEdit.amount
          });
        } else {
          this.editMode = false;
        }
      }
    )
  }

  onSubmit() {
    // Save the value of the form.
    const formValue = this.slForm.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({updatedIngredient: newIngredient}))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }

    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEditIngredient);
    this.editingSubscrition.unsubscribe();
  }
}