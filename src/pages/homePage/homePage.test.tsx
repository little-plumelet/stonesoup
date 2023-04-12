import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as reactHooks from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { HomePage } from './HomePage';
import '../../../matchMedia';

jest.mock('react-redux');

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
const foo = { useAppSelector, useAppDispatch };
const dispatch = jest.fn();

jest.spyOn(foo, 'useAppDispatch').mockReturnValue(dispatch);
jest.spyOn(reactHooks, 'useDispatch').mockReturnValue(dispatch);

describe('Home page', () => {
  it('should render', () => {
    jest.spyOn(foo, 'useAppSelector').mockReturnValue({
      loading: false,
      error: null,
      recipes: [],
    });

    const component = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render cards', async () => {
    jest.spyOn(foo, 'useAppSelector').mockReturnValue({
      loading: false,
      error: null,
      recipes: mockRecipeList,
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getAllByText('Risotto with mashrums')).toHaveLength(2);
  });
});
