import { IIngredient } from './ingredient.interface';
import { Iinstrctions } from './instruction.interface';

export interface IDetailedRecipe {
  id: number;
  title: string;
  aggregateLikes: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: IIngredient[];
  analyzedInstructions: Iinstrctions[];
}
