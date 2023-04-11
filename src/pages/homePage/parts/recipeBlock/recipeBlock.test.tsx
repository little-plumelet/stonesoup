import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RecipeBlock } from './RecipeBlock';
import '../../../../../matchMedia';

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

describe('recipeBlock', () => {
  it('should render', async () => {
    const component = render(
      <MemoryRouter>
        <RecipeBlock
          title="title"
          error={null}
          loading={false}
          recipes={mockRecipeList}
        />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(
      await screen.findByText('Risotto with mashrums')
    ).toBeInTheDocument();
  });

  it('should render loading', async () => {
    render(
      <MemoryRouter>
        <RecipeBlock title="title" error={null} loading recipes={[]} />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('spin')).toBeInTheDocument();
  });

  it('should render error', async () => {
    render(
      <MemoryRouter>
        <RecipeBlock title="title" error="404" loading={false} recipes={[]} />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('error')).toBeInTheDocument();
  });
});
