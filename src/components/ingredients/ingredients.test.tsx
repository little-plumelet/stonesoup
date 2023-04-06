import { render } from '@testing-library/react';
import { Ingredients } from './Ingredients';
import { IIngredient } from '../../interfaces/ingredient.interface';
import '../../../matchMedia';

const mockIngredients: IIngredient[] = [
  {
    name: 'garlic',
    amount: 2,
    unit: '',
  },
  {
    name: 'tomatillos',
    amount: 5.5,
    unit: 'pounds',
  },
];

describe('ingredients', () => {
  it('should render', () => {
    const component = render(
      <Ingredients extendedIngredients={mockIngredients} />
    );

    expect(component).toMatchSnapshot();
  });
});
