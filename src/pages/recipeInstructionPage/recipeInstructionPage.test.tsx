import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios, { AxiosResponse } from 'axios';
import { RecipeInstructionPage } from './RecipeInstructionPage';
import '../../../matchMedia';

jest.mock('axios');
window.scrollTo = jest.fn();

const mockData = {
  id: 123456,
  title: 'blueberry tart',
  aggregateLikes: 89,
  image: 'image',
  readyInMinutes: 125,
  servings: 8,
  extendedIngredients: [],
  analyzedInstructions: [
    {
      name: 'instructions',
      steps: [],
    },
  ],
} as unknown as AxiosResponse;

describe('recipeInstructionPage', () => {
  it('should render', async () => {
    const history = createMemoryHistory({ initialEntries: ['/recipe/716429'] });

    await act(async () => {
      const component = render(
        <Router location={history.location} navigator={history}>
          <RecipeInstructionPage />
        </Router>
      );
      await waitFor(async () => {
        expect(component).toMatchSnapshot();
      });
    });
  });

  it('fetch data with error', async () => {
    (axios.get as jest.Mock).mockImplementation(() => {
      return Promise.reject(new Error());
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <RecipeInstructionPage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Unknown error occurred')).toBeInTheDocument();
  });

  it('fetch data', async () => {
    (axios.get as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        data: mockData,
      });
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <RecipeInstructionPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(axios.get).toBeCalled();
      });
    });

    expect(await screen.findByText('blueberry tart')).toBeInTheDocument();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
