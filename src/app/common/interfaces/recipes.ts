export interface Recipe {
    id: string;
    userId?: string;
    title: string;
    imageUrl: string;
    steps: string[];
    ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
    id?: string;
    userId?: string;
    label: string;
    unit: string;
    amount: number;
}
