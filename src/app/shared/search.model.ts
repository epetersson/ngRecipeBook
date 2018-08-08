import { Recipe } from '../recipes/recipe.model';

export class ApiSearch {
    constructor(public q: string, public hits: Recipe[]) {
    }
}