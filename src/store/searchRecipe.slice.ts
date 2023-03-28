import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../constants';

const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

export interface IRecipe {
  id: number;
  title: string;
  aggregateLikes: number;
  image: string;
  readyInMinutes: number;
}

type SearchedRecipesState = {
  list: IRecipe[];
  searchValue: string;
  loading: boolean;
  offset: number;
  error?: string | null;
};

const initialState: SearchedRecipesState = {
  list: [],
  searchValue: '',
  loading: false,
  offset: 0,
  error: null,
};

export const searchRecipes = createAsyncThunk<
  IRecipe[],
  {
    value: string;
    offset: number;
  },
  { rejectValue: string | null }
>(
  'searchedRecipesStore/searchRecepies',
  async ({ value, offset }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          query: value,
          addRecipeInformation: true,
          apiKey: API_KEY,
          number: 8,
          offset,
        },
      });
      const data = response?.data?.results;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const searchedRecipeSlice = createSlice({
  name: 'searchedRecipesStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.list = action.payload;
        state.offset = action.payload.length + state.offset;
      });
  },
});

export default searchedRecipeSlice.reducer;
