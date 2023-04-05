import { render } from '@testing-library/react';
import { IIngredient } from '../../interface';
import { Ingredients } from './Ingredients';
import '../../../../../matchMedia';

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
