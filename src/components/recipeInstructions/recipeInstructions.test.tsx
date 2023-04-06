import { render } from '@testing-library/react';
import { RecipeInstructions } from './RecipeInstructions';
import '../../../matchMedia';

const mockSteps = [
  {
    number: 1,
    step: 'step 1',
  },
  {
    number: 2,
    step: 'step 2',
  },
];

describe('recipeInstructions', () => {
  it('should render', () => {
    const component = render(<RecipeInstructions steps={mockSteps} />);
    expect(component).toMatchSnapshot();
  });
});
