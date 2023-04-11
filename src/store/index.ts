import { configureStore } from '@reduxjs/toolkit';
import searchedRecipeReducer from './searchRecipe.slice';
import randomDessertRecipeReducer from './randomDessertRecipe.slice';
import randomVegeterianRecipeReducer from './randomVegetarianRecipe.slice';

export const store = configureStore({
  reducer: {
    searchedRecipes: searchedRecipeReducer,
    randomDessertRecipes: randomDessertRecipeReducer,
    randomVegeterianRecipes: randomVegeterianRecipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
