import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants';
import { IDetailedRecipe } from '../interfaces/recipe.interface';

type Recipe = Pick<
  IDetailedRecipe,
  'id' | 'title' | 'aggregateLikes' | 'image' | 'readyInMinutes'
>;

export interface IRandomRecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: IRandomRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

async function fetchRandomRecipesAsync() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        apiKey: API_KEY,
        number: 8,
      },
    });
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(error.message);
    } else {
      throw Error('Unknown error occurred');
    }
  }
}

export const fetchRandomRecipes = createAsyncThunk<
  { recipes: Recipe[] },
  { rejectValue: string }
>('andomRecipeStore/fetchRandomRecipes', async (_, { rejectWithValue }) => {
  try {
    return await fetchRandomRecipesAsync();
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});

const randomRecipeSlice = createSlice({
  name: 'randomRecipeStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomRecipes.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.recipes = action.payload.recipes;
      })
      .addCase(fetchRandomRecipes.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      });
  },
});

export default randomRecipeSlice.reducer;
