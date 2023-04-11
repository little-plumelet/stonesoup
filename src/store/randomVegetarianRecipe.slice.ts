import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../interfaces/recipe.interface';
import { getRandomRecipesAsync, IGetRandomRecipesPros } from './getFunctions';

interface IVegeterianRecipeState {
  recipes: Recipe[];
  loading: boolean;
  error?: string | null;
}

const initialState: IVegeterianRecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

export const getRandomVegeterianRecipes = createAsyncThunk<
  Recipe[],
  Partial<IGetRandomRecipesPros>,
  { rejectValue: string }
>(
  'randomVegetarianRecipeStore/getRandomVegeterianRecipes',
  async ({ tags = ['vegetarian'], number = 4 }, { rejectWithValue }) => {
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

const randomVegetarianRecipeSlice = createSlice({
  name: 'randomVegetarianRecipeStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomVegeterianRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomVegeterianRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recipes = action.payload;
      })
      .addCase(getRandomVegeterianRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default randomVegetarianRecipeSlice.reducer;
