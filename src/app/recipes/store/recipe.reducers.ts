import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

import * as RecipeActions from './recipe.actions';
import * as fromApp from "../../store/app.reducers";

/* 
    Extends AppState to get all properties from AppState, so when this module gets 
    injected it is aware of the appstate as well as the featureState 
*/
export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        ),
        new Recipe(
            'Flying Jacob',
            'Delicious flying jacob with tender chicken, hot chili sauce and sweet bananas',
            'http://via.placeholder.com/1920x1080',
            [
                new Ingredient('Banana', 3),
                new Ingredient('Chicken Filét', 10),
                new Ingredient('Chili Sauce', 2)
            ]
        )
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const recipeListToUpdate = [...state.recipes];
            recipeListToUpdate.splice(action.payload, 1);
            return {
                ...state,
                recipes: recipeListToUpdate
            };
        default:
            return state;
    }
}