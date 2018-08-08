import { Recipe } from '../recipe.model';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  modalRef: BsModalRef;
  // ViewChild allows me to access the template
  @ViewChild('detailsModal') modalTemplate: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>,
              private modalService: BsModalService) { }

  ngOnInit() {
    // Subscribes to changes in the parameters of this URL
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          /* this.recipe = this.recipeService.getRecipe(this.id); */
          this.recipeState = this.store.select('recipes');
          this.modalRef = this.modalService.show(this.modalTemplate);
        }
    );
    this.modalService.onHide.subscribe( (reason: string) => {
      this.router.navigate(['/recipes']); 
    });
  }
  onAddIngredientsToShoppingList() {
    // Recipe state is selected from total state in the select method
    // Take 1 to only get it once
    // then we get all the recipes
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    // Works perfectly as the current relative route is recipe/id
    // and we just add edit on top of it
    this.modalRef.hide();
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    /* this.recipeService.deleteRecipe(this.id); */
    this.modalRef.hide();
    this.router.navigate(['/recipes']); 
  }
}
