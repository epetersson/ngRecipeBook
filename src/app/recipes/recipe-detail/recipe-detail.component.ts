import { Recipe } from '../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // Subscribes to changes in the parameters of this URL
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          /* this.recipe = this.recipeService.getRecipe(this.id); */
          this.recipeState = this.store.select('recipes');
        }
    );
  }

  onAddIngredientsToShoppingList() {
    // Recipe state is selected from total state in the select method
    // Take 1 to only get it once
    // then we get all the recipes
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    // Works perfectly as the current relative route is recipe/id
    // and we just add edit on top of it
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    /* this.recipeService.deleteRecipe(this.id); */
    this.router.navigate(['/recipes']); 
  }

}
