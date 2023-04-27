import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import * as reactHooks from 'react-redux';
import { Header } from './Header';
import { useAppDispatch, useAppSelector } from '../../customHooks/hooksRedux';

jest.mock('react-redux');

const dispatch = jest.fn();
const foo = { useAppSelector, useAppDispatch };

jest.spyOn(foo, 'useAppDispatch').mockReturnValue(dispatch);
jest.spyOn(reactHooks, 'useDispatch').mockReturnValue(dispatch);
jest.spyOn(reactHooks, 'useDispatch').mockReturnValue(dispatch);

describe('header', () => {
  it('should render', () => {
    const component = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('handle searchIcon click', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByTestId('searchicon'));
    expect(history.location.pathname).toBe('/searchresult');
  });

  it('check searchBar', () => {
    const history = createMemoryHistory({ initialEntries: ['/searchresult'] });
    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    );

    expect(history.location.pathname).toBe('/searchresult');
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();
  });
});
