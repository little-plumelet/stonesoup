import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import * as reactHooks from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../customHooks/hooksRedux';
import { ISearchedRecipesState } from '../../store/searchRecipe.slice';
import { SearchResultPage } from './SearchResultPage';
import '../../../matchMedia';
import * as actions from '../../store/searchRecipe.slice';

jest.mock('react-redux');

const mockRecipe = {
  id: 716429,
  title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
  image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
  readyInMinutes: 45,
  aggregateLikes: 209,
};

const mockStateEmpty: ISearchedRecipesState = {
  list: [],
  loading: false,
  error: null,
  offset: 0,
  totalResults: 0,
  searchValue: '',
};

const mockStateWithRecipes: ISearchedRecipesState = {
  list: [{ ...mockRecipe }],
  loading: false,
  error: null,
  offset: 0,
  totalResults: 1,
  searchValue: 'salsa',
};

const mockStateWithLoading: ISearchedRecipesState = {
  list: [],
  loading: true,
  error: null,
  offset: 0,
  totalResults: 1,
  searchValue: '',
};

const mockStateWithError: ISearchedRecipesState = {
  list: [],
  loading: false,
  error: 'not found',
  offset: 0,
  totalResults: 1,
  searchValue: '',
};

const mockLocation = {
  pathname: '',
  search: '',
  hash: '',
  state: null,
  key: 'default',
};

const foo = { useAppSelector, useAppDispatch, useNavigate, useLocation };
const dispatch = jest.fn();

jest.spyOn(foo, 'useAppDispatch').mockReturnValue(dispatch);
jest.spyOn(foo, 'useNavigate').mockReturnValue(jest.fn());
jest.spyOn(foo, 'useLocation').mockReturnValue({ ...mockLocation });
jest.spyOn(reactHooks, 'useDispatch').mockReturnValue(dispatch);

describe('render searchResultPage', () => {
  it('with empty array of recipes', () => {
    jest.spyOn(foo, 'useAppSelector').mockReturnValue({ ...mockStateEmpty });

    const component = render(
      <BrowserRouter>
        <SearchResultPage />
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it('with recipes', () => {
    jest
      .spyOn(foo, 'useAppSelector')
      .mockReturnValue({ ...mockStateWithRecipes });

    const component = render(
      <BrowserRouter>
        <SearchResultPage />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('should dispatch actions', async () => {
    jest
      .spyOn(foo, 'useAppSelector')
      .mockReturnValue({ ...mockStateWithRecipes });

    const getMoreRecipesMocked = jest.spyOn(actions, 'getMoreRecipes');

    render(
      <BrowserRouter>
        <SearchResultPage />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('loadMoreButton'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(getMoreRecipesMocked).toHaveBeenCalledTimes(1);
    expect(getMoreRecipesMocked).toHaveBeenCalledWith({
      value: 'salsa',
      offset: 0,
    });
  });

  it('should show spin of loading', async () => {
    jest
      .spyOn(foo, 'useAppSelector')
      .mockReturnValue({ ...mockStateWithLoading });

    render(
      <BrowserRouter>
        <SearchResultPage />
      </BrowserRouter>
    );

    expect(await screen.findByTestId('spin')).toBeInTheDocument();
  });

  it('should show error', async () => {
    jest
      .spyOn(foo, 'useAppSelector')
      .mockReturnValue({ ...mockStateWithError });

    render(
      <BrowserRouter>
        <SearchResultPage />
      </BrowserRouter>
    );

    expect(await screen.findByText('not found')).toBeInTheDocument();
  });
});
