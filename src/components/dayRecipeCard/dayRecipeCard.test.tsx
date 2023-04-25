import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { DayRecipeCard } from './DayRecipeCard';
import MOCK_DATA from './MOCKDATA.json';

const { id } = MOCK_DATA;

describe('DayRecipeCard', () => {
  it('should redirect', async () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <DayRecipeCard />
      </Router>
    );

    fireEvent.click(await screen.getByTestId('DayRecipeButton'));
    expect(history.location.pathname).toBe(`/recipe/${id}`);
  });
});
