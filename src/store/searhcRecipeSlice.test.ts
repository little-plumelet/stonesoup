import axios from 'axios';
import searchedRecipeReducer, {
  addSearchValue,
  ISearchedRecipesState,
  searchRecipes,
  getMoreRecipes,
} from './searchRecipe.slice';

const initialState: ISearchedRecipesState = {
  list: [],
  searchValue: '',
  loading: false,
  offset: 0,
  totalResults: 0,
  error: null,
};

const mockData = {
  id: 716429,
  title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
  image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
  readyInMinutes: 45,
  aggregateLikes: 209,
};

const searchRecipesMockProps = {
  value: '',
  offset: 0,
};

jest.mock('axios');

test('searchRecipeSlice', () => {
  const store = searchedRecipeReducer(undefined, { type: '' });
  expect(store).toEqual(initialState);
});

test('addSearchValue', () => {
  const searchValue = 'salsa';
  const action = {
    type: addSearchValue.type,
    payload: searchValue,
  };

  const result = searchedRecipeReducer(initialState, action);

  expect(result.searchValue).toEqual(searchValue);
});

describe('get recipes via search', () => {
  it('get recipes with success thunk', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          results: [{ ...mockData }],
          offset: 46,
          totalResults: 59,
        },
      })
    );

    const dispatch = jest.fn();
    const thunk = searchRecipes(searchRecipesMockProps);

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toEqual(
      searchRecipes.pending('', searchRecipesMockProps).type
    );
    expect(end[0].type).toEqual('searchedRecipesStore/searchRecipes/fulfilled');
    expect(end[0].payload).toEqual({
      recipes: [{ ...mockData }],
      offset: 46,
      totalResults: 59,
    });
  });

  it('get recipes with error thunk', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error())
    );

    const dispatch = jest.fn();
    const thunk = searchRecipes(searchRecipesMockProps);

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toEqual(
      searchRecipes.pending('', searchRecipesMockProps).type
    );
    expect(end[0].type).toEqual(
      searchRecipes.rejected(null, '', searchRecipesMockProps).type
    );
    expect(end[0].payload).toEqual('Unknown error occurred');
    expect(end[0].meta.rejectedWithValue).toEqual(true);
  });

  // extra-reducers
  it('search recipes pending', () => {
    const state = searchedRecipeReducer(
      initialState,
      searchRecipes.pending('', searchRecipesMockProps)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('search recipes fulfilled', () => {
    const expectedState = {
      totalResults: 1,
      recipes: [{ ...mockData }],
      offset: 0,
    };
    const state = searchedRecipeReducer(
      initialState,
      searchRecipes.fulfilled({ ...expectedState }, '', {
        value: '',
        offset: 0,
      })
    );
    expect(state).toEqual({
      loading: false,
      error: null,
      offset: expectedState.recipes.length,
      list: expectedState.recipes,
      totalResults: expectedState.totalResults,
      searchValue: '',
    });
  });

  it('search recipes rejected', () => {
    const state = searchedRecipeReducer(
      initialState,
      searchRecipes.rejected(
        new Error(),
        '',
        searchRecipesMockProps,
        'Unknown error occured'
      )
    );

    expect(state).toEqual({
      ...initialState,
      error: 'Unknown error occured',
      loading: false,
    });
  });
});

describe('get more recipes', () => {
  it('get more recipes with succses', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          results: [{ ...mockData }],
          offset: 21,
          totalResults: 22,
        },
      })
    );

    const dispatch = jest.fn();
    const thunk = getMoreRecipes({ value: '', offset: 8 });

    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toEqual(
      getMoreRecipes.pending('', { value: '', offset: 0 }).type
    );
    expect(end[0].type).toEqual(
      'searchedRecipesStore/getMoreRecipes/fulfilled'
    );
    expect(end[0].payload).toEqual({
      recipes: [{ ...mockData }],
      offset: 21,
      totalResults: 22,
    });
  });

  it('get more recipes with error', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error())
    );

    const dispatch = jest.fn();
    const thunk = getMoreRecipes({ value: '', offset: 8 });

    await thunk(dispatch, () => {}, {});

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toEqual(
      getMoreRecipes.pending('', { value: '', offset: 0 }).type
    );
    expect(end[0].type).toEqual('searchedRecipesStore/getMoreRecipes/rejected');
    expect(end[0].payload).toEqual('Unknown error occurred');
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

  // extra reducers
  it('get more recipes pending', () => {
    const state = searchedRecipeReducer(
      initialState,
      getMoreRecipes.pending('', searchRecipesMockProps)
    );

    expect(state.error).toBeNull();
    expect(state.loading).toBeTruthy();
  });

  it('get more recipes fulfilled', () => {
    const expectedState = {
      totalResults: 1,
      recipes: [{ ...mockData }],
      offset: 0,
    };

    const state = searchedRecipeReducer(
      initialState,
      getMoreRecipes.fulfilled({ ...expectedState }, '', searchRecipesMockProps)
    );

    expect(state).toEqual({
      error: null,
      loading: false,
      list: [...expectedState.recipes],
      offset: expectedState.recipes.length,
      totalResults: expectedState.totalResults,
      searchValue: '',
    });
  });

  it('get more recipes rejected', () => {
    const state = searchedRecipeReducer(
      initialState,
      getMoreRecipes.rejected(
        new Error(),
        '',
        searchRecipesMockProps,
        'Unknown error occured'
      )
    );

    expect(state.error).toEqual('Unknown error occured');
    expect(state.loading).toBeFalsy();
  });
});
