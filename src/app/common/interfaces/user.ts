import { RecipeIngredient } from "./recipes";

export interface User {
    id: string;
    name: string;
    ingredients: RecipeIngredient[];
}
