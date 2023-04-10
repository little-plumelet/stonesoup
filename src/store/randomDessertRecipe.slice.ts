import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDetailedRecipe } from '../interfaces/recipe.interface';
import { getRandomRecipesAsync, IGetRandomRecipesPros } from './getFunctions';

type Recipe = Pick<
  IDetailedRecipe,
  'id' | 'title' | 'aggregateLikes' | 'image' | 'readyInMinutes'
>;

export interface IdessertRecipesState {
  recipes: Recipe[];
  loading: boolean;
  error?: string | null;
}

const initialState: IdessertRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const getRandomDessertRecipes = createAsyncThunk<
  Recipe[],
  Partial<IGetRandomRecipesPros>,
  { rejectValue: string }
>(
  'randomDessertRecipeStore/getRandomDessertRecipes',
  async ({ tags = ['dessert'], number = 4 }, { rejectWithValue }) => {
    try {
      return await getRandomRecipesAsync({ tags, number });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const randomDessertRecipeSlice = createSlice({
  name: 'randomDesserRecipeStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomDessertRecipes.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRandomDessertRecipes.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getRandomDessertRecipes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default randomDessertRecipeSlice.reducer;
