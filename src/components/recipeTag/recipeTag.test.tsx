import { render, screen } from '@testing-library/react';
import '../../../matchMedia';
import { RecipeTag } from './RecipeTag';

const mockData = {
  title: 'TAG',
  content: 'tag content',
};

describe('recipeTag', () => {
  it('snapshot', async () => {
    const component = render(
      <RecipeTag title={mockData.title} content={mockData.content} />
    );
    expect(component).toMatchSnapshot();
    expect(await screen.findByText('TAG')).toBeInTheDocument();
  });
});
