import { fireEvent, render, screen } from '@testing-library/react';
import { RecipeInstructions } from './RecipeInstructions';
import '../../../matchMedia';

interface IRecipeInstructionsProps {
  steps: IStep[];
}

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
