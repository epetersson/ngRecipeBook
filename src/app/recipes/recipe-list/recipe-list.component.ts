import { FetchRecipesFromApi } from './../store/recipe.actions';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit/* , OnDestroy */ {
  recipeState: Observable<{recipes: Recipe[]}>;
/*   private recipes: Recipe[];
  private subscription: Subscription; */

  // We use the feature state because this is the state of the module as it is lazily loaded
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // store.select returns an observable, that is why this.recipeState is an observable
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if (params['query'])
            this.store.dispatch(new RecipeActions.FetchRecipesFromApi(params['query']));
          else 
            this.router.navigate(['recipes']);
        }
    );
    this.recipeState = this.store.select('recipes');
    /* this.store.dispatch(new RecipeActions.FetchRecipesFromApi()); */

    /* this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged
      .subscribe( (recipes: Recipe[]) => {
        this.recipes = recipes;
      }); */
  }

  onNewRecipe() {
    // Navigates to recipes/new, gets the relative path
    // through activatedRoute
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /* ngOnDestroy() {
    this.subscription.unsubscribe();
  } */

}
