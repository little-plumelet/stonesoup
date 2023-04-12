import axios from 'axios';
import getRandomVegetarianRecipeReducer, {
  getRandomVegetarianRecipes,
} from './randomVegetarianRecipe.slice';

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
describe('randomVegetarianRecipeSlice', () => {
  it('get random vegetarian recipes thunk fulfilled', async () => {
    const dispatch = jest.fn();

    (axios.get as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        data: {
          recipes: mockRecipeList,
        },
      });
    });

    const thunk = getRandomVegetarianRecipes({});
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);
    const [start, end] = calls;
    expect(start[0].type).toBe(
      getRandomVegetarianRecipes.pending('', {}, {}).type
    );
    expect(end[0].type).toBe(
      getRandomVegetarianRecipes.fulfilled([], '', {}).type
    );
    expect(end[0].payload).toBe(mockRecipeList);
  });

  it('get random vegetarian recipes thunk rejected', async () => {
    const dispatch = jest.fn();

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error())
    );

    const thunk = getRandomVegetarianRecipes({});
    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(
      getRandomVegetarianRecipes.pending('', {}, {}).type
    );
    expect(end[0].type).toBe(
      getRandomVegetarianRecipes.rejected(null, '', {}).type
    );
    expect(end[0].payload).toBe('Unknown error occurred');
  });

  it('getRandomVegetarianRecipes.pending', () => {
    const state = getRandomVegetarianRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomVegetarianRecipes.pending('', {}, {})
    );

    expect(state.loading).toBeTruthy();
    expect(state.error).toBeFalsy();
  });

  it('getRandomVegetarianRecipes.rejected', () => {
    const state = getRandomVegetarianRecipeReducer(
      { recipes: [], loading: false, error: 'error' },
      getRandomVegetarianRecipes.rejected(
        new Error(),
        '',
        {},
        'An unexpected error occured'
      )
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBe('An unexpected error occured');
  });

  it('getRandomVegetarianRecipes.fulfilled', () => {
    const state = getRandomVegetarianRecipeReducer(
      { recipes: [], loading: true, error: 'error' },
      getRandomVegetarianRecipes.fulfilled(mockRecipeList, '', {})
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBeFalsy();
    expect(state.recipes).toBe(mockRecipeList);
  });
});
