import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import * as reactHooks from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { store } from '../../../../store';
import * as actions from '../../../../store/searchRecipe.slice';

jest.mock('react-redux');

const dispatch = jest.fn();
jest.spyOn(reactHooks, 'useDispatch').mockReturnValue(dispatch);

// const renderWithContext = (element: React.ReactElement) => {
//   render(<Provider store={store}>{element}</Provider>);
// };

describe('searchBar should be rendered', () => {
  it('', () => {
    render(<SearchBar />);
    const searchBar = screen.getByPlaceholderText('input search text');
    expect(searchBar).toBeInTheDocument();
  });

  it('dispatch action', () => {
    const searchRecipesMocked = jest.spyOn(actions, 'searchRecipes');
    const addSearchValueMocked = jest.spyOn(actions, 'addSearchValue');
    render(<SearchBar />);

    const input = screen.getByTestId('searchbar');
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(searchRecipesMocked).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'salad' } });
    expect(input).toHaveValue('salad');

    fireEvent.click(button);
    expect(addSearchValueMocked).toHaveBeenCalledTimes(2);
    expect(searchRecipesMocked).toHaveBeenCalledTimes(1);
  });
});
