import { render } from '@testing-library/react';
import { RecipeTagList } from './RecipeTagList';

const mockTags = [
  {
    title: 'TAG',
    content: 'tag content',
  },
  {
    title: 'REACT',
    content: 'react content',
  },
  {
    title: 'servings',
    content: 1,
  },
  {
    title: 'prep time',
    content: 34,
  },
];

describe('recipetaglist', () => {
  it('should render', () => {
    const component = render(<RecipeTagList tags={mockTags} />);
    expect(component).toMatchSnapshot();
  });
});
