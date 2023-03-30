import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { SearchBar } from './index';
import { store } from '../../../../store';

const renderWithContext = (element: React.ReactElement) => {
  render(<Provider store={store}>{element}</Provider>);
};

test('searchBar should be rendered', () => {
  renderWithContext(<SearchBar />);
  const searchBar = screen.getByPlaceholderText('input search text');
  expect(searchBar).toBeInTheDocument();
});
