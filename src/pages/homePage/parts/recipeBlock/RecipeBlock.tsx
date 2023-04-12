import { Spin, Typography } from 'antd';
import { RecipeCardList } from '../../../../components/recipeCardList';
import { Recipe } from '../../../../interfaces/recipe.interface';
import style from './style.module.css';

const { Title } = Typography;

interface IRecipeBlockProps {
  title: string;
  recipes: Recipe[];
  loading: boolean;
  error: string | null | undefined;
}
export function RecipeBlock({
  title,
  recipes,
  loading,
  error,
}: IRecipeBlockProps) {
  return (
    <div>
      <Title level={3}>{title}</Title>
      {loading && (
        <div className={style.spinContainer}>
          <Spin size="large" data-testid="spin" />
        </div>
      )}
      {error && (
        <p data-testid="error" className={style.error}>
          {error}
        </p>
      )}
      {!!recipes.length && <RecipeCardList recipes={recipes} />}
    </div>
  );
}
