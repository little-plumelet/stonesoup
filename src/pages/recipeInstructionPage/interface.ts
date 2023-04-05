export interface IIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface IDetailedRecipe {
  extendedIngredients: IIngredient[];
  id: number;
  title: string;
  aggregateLikes: number;
  image: string;
  readyInMinutes: number;
}
