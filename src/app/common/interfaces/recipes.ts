export interface Recipe {
    id: string;
    title: string;
    imageUrl: string;
    steps: string[];
    ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
    id?: string;
    label: string;
    unit: string;
    amount: number;
}
