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

export interface ISearchedRecipesState {
  list: IRecipe[];
  searchValue: string;
  loading: boolean;
  offset: number;
  totalResults: number;
  error?: string | null;
}

interface ISearchRecipesAsyncProps {
  value: string;
  offset: number;
}

interface ISearchRecipesAsyncResponse {
  recipes: IRecipe[];
  offset: number;
  totalResults: number;
}

const initialState: ISearchedRecipesState = {
  list: [],
  searchValue: '',
  loading: false,
  offset: 0,
  totalResults: 0,
  error: null,
};

async function searchRecipesAsync({
  value,
  offset,
}: ISearchRecipesAsyncProps): Promise<ISearchRecipesAsyncResponse> {
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
    return {
      offset: response?.data?.offset,
      totalResults: response?.data?.totalResults,
      recipes: response?.data?.results,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(error.message);
    }
    throw Error('Unknown error occurred');
  }
}

export const searchRecipes = createAsyncThunk<
  ISearchRecipesAsyncResponse,
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
  ISearchRecipesAsyncResponse,
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
        state.list = action.payload.recipes;
        state.offset = action.payload.recipes.length;
        state.totalResults = action.payload.totalResults;
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
        state.list = [...state.list, ...action.payload.recipes];
        state.offset = action.payload.offset + action.payload.recipes.length;
      });
  },
});

export const { addSearchValue } = searchedRecipeSlice.actions;
export default searchedRecipeSlice.reducer;
