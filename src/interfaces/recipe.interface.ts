import { IDetailedRecipe } from './detailedRecipe.interface';

export type Recipe = Pick<
  IDetailedRecipe,
  'id' | 'title' | 'aggregateLikes' | 'image' | 'readyInMinutes'
>;
