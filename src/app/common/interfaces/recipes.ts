export interface Recipe {
    id: string;
    title: string;
    imageUrl: string;
    steps: string[];
    ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
    label: string;
    unit: string;
    amount: number;
}
