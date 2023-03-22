import { Col, Row } from 'antd';
import { RecipeCard } from '../recipeCard/recipeCard';

export function RecipeCardList() {
  const cards = [1, 2, 3, 4, 5];
  return (
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
      {cards.map((card) => (
        <Col key={card} span={6} xs={24} sm={12} lg={8} xl={6} xxl={4}>
          <RecipeCard />
        </Col>
      ))}
    </Row>
  );
}
