import { createBrowserRouter } from 'react-router-dom';
import { routes } from './constants-routes';
import { AboutPage } from './pages/aboutPage';
import { ErrorPage } from './pages/errorPage';
import { HomePage } from './pages/homePage';
import { RecipeInstructionPage } from './pages/recipeInstructionPage';
import { SearchResultPage } from './pages/searchResultPage';

const completeRoutes = [
  {
    ...routes.home,
    element: <HomePage />,
  },
  {
    ...routes.about,
    element: <AboutPage />,
  },
  {
    ...routes.contacts,
    element: <div />,
  },
  {
    ...routes.searchResult,
    element: <SearchResultPage />,
  },
  {
    ...routes.detailedRecipe,
    element: <RecipeInstructionPage />,
  },
  {
    ...routes.other,
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(completeRoutes);
