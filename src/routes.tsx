import { createBrowserRouter } from 'react-router-dom';
import { AboutPage } from './pages/aboutPage';
import { ErrorPage } from './pages/errorPage';
import { HomePage } from './pages/homePage';
import { SearchResultPage } from './pages/searchResultPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/searchresult',
    element: <SearchResultPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
