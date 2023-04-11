import axios from 'axios';
import getRandomVegeterianRecipeReducer, { getRandomVegeterianRecipes } from './randomVegetarianRecipe.slice';

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

jest.mock('axios');
describe('randomVegeterianRecipeSlice', () => {
  it('get random vegeterian recipes thunk fulfilled', async () => {
    const dispatch = jest.fn();

    (axios.get as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        data: {
          recipes: mockRecipeList,
        },
      });
    });

    const thunk = getRandomVegeterianRecipes({});
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(
      getRandomVegeterianRecipes.pending('', {}, {}).type
    );
    expect(end[0].type).toBe(
      getRandomVegeterianRecipes.fulfilled([], '', {}).type
    );
    expect(end[0].payload).toBe(mockRecipeList);
  });

  it('get random vegeterian recipes thunk rejected', async () => {
    const dispatch = jest.fn();

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error())
    );

    const thunk = getRandomVegeterianRecipes({});
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(
      getRandomVegeterianRecipes.pending('', {}, {}).type
    );
    expect(end[0].type).toBe(
      getRandomVegeterianRecipes.rejected(null, '', {}).type
    );
    expect(end[0].payload).toBe('Unknown error occurred');
  });

  it('getRandomVegeterianRecipes.pending', () => {
    const state = getRandomVegeterianRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomVegeterianRecipes.pending('', {}, {})
    );

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeFalsy();
  });

  it('getRandomVegeterianRecipes.rejected', () => {
    const state = getRandomVegeterianRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomVegeterianRecipes.rejected(
        new Error(),
        '',
        {},
        'An unexpected error occured'
      )
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe('An unexpected error occured');
  });

  it('getRandomVegeterianRecipes.fulfilled', () => {
    const state = getRandomVegeterianRecipeReducer(
      { recipes: [], loading: true, error: 'error' },
      getRandomVegeterianRecipes.fulfilled(mockRecipeList, '', {})
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.recipes).toBe(mockRecipeList);
  });
});
