import { configureStore } from '@reduxjs/toolkit';
import searchedRecipeReducer from './searchRecipe.slice';

export const store = configureStore({
  reducer: {
    searchedRecipes: searchedRecipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
