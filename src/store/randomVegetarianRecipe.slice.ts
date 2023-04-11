import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../interfaces/recipe.interface';
import { getRandomRecipesAsync, IGetRandomRecipesPros } from './getFunctions';

interface IVegetarianRecipeState {
  recipes: Recipe[];
  loading: boolean;
  error?: string | null;
}

const initialState: IVegetarianRecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

export const getRandomVegetarianRecipes = createAsyncThunk<
  Recipe[],
  Partial<IGetRandomRecipesPros>,
  { rejectValue: string }
>(
  'randomVegetarianRecipeStore/getRandomVegetarianRecipes',
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
      .addCase(getRandomVegetarianRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomVegetarianRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recipes = action.payload;
      })
      .addCase(getRandomVegetarianRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default randomVegetarianRecipeSlice.reducer;
