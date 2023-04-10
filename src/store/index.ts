import { configureStore } from '@reduxjs/toolkit';
import searchedRecipeReducer from './searchRecipe.slice';
import randomRecipeReducer from './randomRecipe.slice';

export const store = configureStore({
  reducer: {
    searchedRecipes: searchedRecipeReducer,
    randomRecipes: randomRecipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
