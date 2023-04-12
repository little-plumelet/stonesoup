import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router, useNavigate } from 'react-router-dom';
import { RecipeCard } from './RecipeCard';

const mockRecipe = {
  id: 716428,
  title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
  image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
  readyInMinutes: 15,
  aggregateLikes: 29,
};

const foo = { useNavigate };

jest.spyOn(foo, 'useNavigate').mockReturnValue(jest.fn());

describe('recipeCard', () => {
  it('should render', () => {
    const component = render(
      <MemoryRouter>
        <RecipeCard
          id={mockRecipe.id}
          title={mockRecipe.title}
          image={mockRecipe.image}
          readyInMinutes={mockRecipe.readyInMinutes}
          aggregateLikes={mockRecipe.aggregateLikes}
        />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });

  it('should redirect', () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <RecipeCard
          id={mockRecipe.id}
          title={mockRecipe.title}
          image={mockRecipe.image}
          readyInMinutes={mockRecipe.readyInMinutes}
          aggregateLikes={mockRecipe.aggregateLikes}
        />
      </Router>
    );

    fireEvent.click(screen.getByText('View recipe'));
    expect(history.location.pathname).toBe('/recipe/716428');
  });
});
