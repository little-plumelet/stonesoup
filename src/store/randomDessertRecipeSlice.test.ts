import axios from 'axios';
import { getRandomDessertRecipes } from './randomDessertRecipe.slice';

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
      Promise.reject(new Error('404'))
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
      'randomDessertRecipeStore/getRandomDessertRecipes/rejected'
    );
    expect(end[0].payload).toBe('Unknown error occurred');
  });
});
