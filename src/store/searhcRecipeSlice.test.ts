import axios from 'axios';
import searchedRecipeReducer, {
  addSearchValue,
  ISearchedRecipesState,
  searchRecipes,
} from './searchRecipe.slice';

const initialState: ISearchedRecipesState = {
  list: [],
  searchValue: '',
  loading: false,
  offset: 0,
  totalResults: 0,
  error: null,
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
  it('get recipes with success', async () => {
    const mockData = {
      id: 716429,
      title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
      image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
      readyInMinutes: 45,
      aggregateLikes: 209,
    };

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          results: [
            {
              id: 716429,
              title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
              image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
              readyInMinutes: 45,
              aggregateLikes: 209,
            },
          ],
          offset: 46,
          totalResults: 59,
        },
      })
    );

    const dispatch = jest.fn();
    const thunk = searchRecipes({ value: '', offset: 0 });

    await thunk(dispatch, () => ({}), {});

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toEqual(
      'searchedRecipesStore/searchRecepies/pending'
    );
    expect(end[0].type).toEqual(
      'searchedRecipesStore/searchRecepies/fulfilled'
    );
    expect(end[0].payload).toEqual({
      recipes: [{ ...mockData }],
      offset: 46,
      totalResults: 59,
    });
  });
});
