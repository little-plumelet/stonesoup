import { configureStore } from '@reduxjs/toolkit';
import searchedRecipeReducer from './searchRecipe.slice';
import randomDessertRecipeReducer from './randomDessertRecipe.slice';
import randomVegetarianRecipeReducer from './randomVegetarianRecipe.slice';

export const store = configureStore({
  reducer: {
    searchedRecipes: searchedRecipeReducer,
    randomDessertRecipes: randomDessertRecipeReducer,
    randomVegetarianRecipes: randomVegetarianRecipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
