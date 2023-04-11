import { Divider, Layout } from 'antd';
import { useEffect } from 'react';
import style from './style.module.css';
import { Header } from '../../commonComponents/header';
import { DayRecipeCard } from '../../components/dayRecipeCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRandomDessertRecipes } from '../../store/randomDessertRecipe.slice';
import { RecipeBlock } from './parts/recipeBlock';

const { Content, Footer } = Layout;

export function HomePage() {
  const {
    recipes: dessertRecipes,
    loading: dessertLoading,
    error: dessertError,
  } = useAppSelector((state) => state.randomDessertRecipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomDessertRecipes({}));
  }, [dispatch]);

  return (
    <Layout className={style.layout}>
      <Header />
      <Divider />
      <Content className={style.content}>
        <DayRecipeCard />
        <RecipeBlock
          loading={dessertLoading}
          error={dessertError}
          recipes={dessertRecipes}
          title="Sweet tooth"
        />
        {/*
        <Title level={3}>Vegeterian</Title>
        {/* {loading && (
          <div className={style.spinContainer}>
            <Spin size="large" data-testid="spin" />
          </div>
        )}
        {error && <p className={style.error}>{error}</p>}
        {!!recipes.length && <RecipeCardList recipes={recipes} />} */}
      </Content>
      <Footer />
    </Layout>
  );
}
