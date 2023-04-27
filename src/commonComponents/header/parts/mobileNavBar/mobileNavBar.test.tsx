import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MobileNavBar } from './MobileNavBar';

describe('navbar', () => {
  it('should be rendered', () => {
    const component = render(
      <MemoryRouter>
        <MobileNavBar />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
  it('links work', () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <MobileNavBar />
      </Router>
    );

    fireEvent.click(screen.getByTestId('burger-menu'));
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');

    fireEvent.click(screen.getByTestId('burger-menu'));
    fireEvent.click(screen.getByText('About Us'));
    expect(history.location.pathname).toBe('/about');
  });
});
