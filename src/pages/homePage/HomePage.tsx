import { Divider, Layout, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import style from './style.module.css';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { DayRecipeCard } from '../../components/dayRecipeCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRandomDessertRecipes } from '../../store/randomDessertRecipe.slice';

const { Content, Footer } = Layout;
const { Title } = Typography;

export function HomePage() {
  const { recipes, loading, error } = useAppSelector(
    (state) => state.randomDessertRecipes
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomDessertRecipes({}));
  }, [dispatch]);
  console.log('loading = ', loading);
  console.log('error = ', error);
  console.log('recipes = ', recipes);
  return (
    <Layout className={style.layout}>
      <Header />
      <Divider />
      <Content className={style.content}>
        <DayRecipeCard />
        <Title level={3}>Sweet tooth</Title>
        {loading && (
          <div className={style.spinContainer}>
            <Spin size="large" data-testid="spin" />
          </div>
        )}
        {error && <p className={style.error}>{error}</p>}
        {!!recipes.length && <RecipeCardList recipes={recipes} />}
        <Title level={3}>Vegeterian</Title>
        {loading && (
          <div className={style.spinContainer}>
            <Spin size="large" data-testid="spin" />
          </div>
        )}
        {error && <p className={style.error}>{error}</p>}
        {!!recipes.length && <RecipeCardList recipes={recipes} />}
      </Content>
      <Footer />
    </Layout>
  );
}
