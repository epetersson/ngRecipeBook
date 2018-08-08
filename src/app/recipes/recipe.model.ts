import { Ingredient } from '../shared/ingredient.model';
export class Recipe {

    constructor(
        public label: string,
        public description: string,
        public image: string,
        public ingredients: Ingredient[]
    ) {}

}
