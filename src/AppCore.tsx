import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export function AppCore() {
  return <RouterProvider router={router} />;
}
