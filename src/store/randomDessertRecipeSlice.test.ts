import axios from 'axios';
import getRandomDessertRecipeReducer, {
  getRandomDessertRecipes,
} from './randomDessertRecipe.slice';

jest.mock('axios');

const mockRecipeList = [
  {
    id: 716428,
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
    readyInMinutes: 15,
    aggregateLikes: 29,
  },
  {
    id: 716429,
    title: 'Risotto with mashrums',
    image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
    readyInMinutes: 57,
    aggregateLikes: 84,
  },
];

describe('randomDessertRecipeSlice', () => {
  it('get recipes fullfiled', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          recipes: mockRecipeList,
        },
      })
    );

    const dispatch = jest.fn();

    const thunk = getRandomDessertRecipes({});

    await thunk(dispatch, () => ({}), {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(
      'randomDessertRecipeStore/getRandomDessertRecipes/pending'
    );
    expect(end[0].type).toBe(
      'randomDessertRecipeStore/getRandomDessertRecipes/fulfilled'
    );
    expect(end[0].payload).toBe(mockRecipeList);
  });

  it('get recipes rejected', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error())
    );

    const dispatch = jest.fn();

    const thunk = getRandomDessertRecipes({});

    await thunk(dispatch, () => ({}), {});
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(
      getRandomDessertRecipes.pending('', {}, {}).type
    );
    expect(end[0].type).toBe(
      getRandomDessertRecipes.rejected(null, '', {}).type
    );
    expect(end[0].payload).toBe('Unknown error occurred');
  });

  it('getRandomDessertRecipes.pending', () => {
    const state = getRandomDessertRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomDessertRecipes.pending('', {}, {})
    );

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeFalsy();
  });

  it('getRandomDessertRecipes.rejected', () => {
    const state = getRandomDessertRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomDessertRecipes.rejected(
        new Error(),
        '',
        {},
        'An unexpected error occured'
      )
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe('An unexpected error occured');
  });

  it('getRandomDessertRecipes.fulfilled', () => {
    const state = getRandomDessertRecipeReducer(
      { recipes: [], loading: true, error: 'error' },
      getRandomDessertRecipes.fulfilled(mockRecipeList, '', {})
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.recipes).toBe(mockRecipeList);
  });
});
