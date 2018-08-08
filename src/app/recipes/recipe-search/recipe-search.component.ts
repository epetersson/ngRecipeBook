import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  @ViewChild('form') searchForm: NgForm;

  constructor(private store: Store<fromRecipe.FeatureState>, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.searchForm.value;
    console.log(formValue.searchQuery);
   /*  this.store.dispatch(new RecipeActions.FetchRecipesFromApi(formValue.searchQuery)); */
    this.router.navigate(['recipes', 'list'], {queryParams: {query: formValue.searchQuery}});
  }

}
