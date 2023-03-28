import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

interface ISearchedRecipesState {
  list: IRecipe[];
  searchValue: string;
  loading: boolean;
  offset: number;
  error?: string | null;
}

interface ISearchRecipesAsyncProps {
  value: string;
  offset: number;
}

const initialState: ISearchedRecipesState = {
  list: [],
  searchValue: '',
  loading: false,
  offset: 0,
  error: null,
};

async function searchRecipesAsync({ value, offset }: ISearchRecipesAsyncProps) {
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
      throw Error(error.message);
    }
    throw Error('Unknown error occurred');
  }
}

export const searchRecipes = createAsyncThunk<
  IRecipe[],
  ISearchRecipesAsyncProps,
  { rejectValue: string }
>(
  'searchedRecipesStore/searchRecepies',
  async ({ value, offset }, { rejectWithValue }) => {
    try {
      return await searchRecipesAsync({
        value,
        offset,
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

export const getMoreRecipes = createAsyncThunk<
  IRecipe[],
  ISearchRecipesAsyncProps,
  { rejectValue: string }
>(
  'searchedRecipesStore/getMoreRecipes',
  async ({ value, offset }, { rejectWithValue }) => {
    try {
      return await searchRecipesAsync({
        value,
        offset,
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

const searchedRecipeSlice = createSlice({
  name: 'searchedRecipesStore',
  initialState,
  reducers: {
    addSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
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
        state.offset = action.payload.length;
      })
      .addCase(getMoreRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoreRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMoreRecipes.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.list = [...state.list, ...action.payload];
        state.offset = action.payload.length + state.offset;
      });
  },
});

export const { addSearchValue } = searchedRecipeSlice.actions;
export default searchedRecipeSlice.reducer;
