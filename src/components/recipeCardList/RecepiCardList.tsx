import { Col, Row } from 'antd';
import { IDetailedRecipe } from '../../interfaces/detailedRecipe.interface';
import { RecipeCard } from '../recipeCard/RecipeCard';

type IRecipeCardListProps = {
  recipes: Pick<
    IDetailedRecipe,
    'id' | 'title' | 'image' | 'readyInMinutes' | 'aggregateLikes'
  >[];
};

export function RecipeCardList({ recipes }: IRecipeCardListProps) {
  return (
    <Row gutter={[24, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
      {recipes.map((recipe) => (
        <Col key={recipe.id} span={6} xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <RecipeCard
            id={recipe?.id}
            title={recipe?.title}
            image={recipe?.image}
            readyInMinutes={recipe?.readyInMinutes}
            aggregateLikes={Number(recipe?.aggregateLikes)}
          />
        </Col>
      ))}
    </Row>
  );
}
