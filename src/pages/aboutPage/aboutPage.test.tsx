import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

describe('About page', () => {
  it('should render', () => {
    const component = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
