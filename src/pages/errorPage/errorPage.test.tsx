import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

describe('error page', () => {
  it('should render', () => {
    const component = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
