import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AboutPage } from './pages/aboutPage';
import { ErrorPage } from './pages/errorPage';
import { HomePage } from './pages/homePage';

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
    path: '*',
    element: <ErrorPage />,
  },
]);
