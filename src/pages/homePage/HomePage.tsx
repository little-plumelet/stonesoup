import { Divider, Layout } from 'antd';
import { useEffect } from 'react';
import style from './style.module.css';
import { Header } from '../../commonComponents/header';
import { DayRecipeCard } from '../../components/dayRecipeCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRandomDessertRecipes } from '../../store/randomDessertRecipe.slice';
import { getRandomVegetarianRecipes } from '../../store/randomVegetarianRecipe.slice';
import { RecipeBlock } from './parts/recipeBlock';

const { Content, Footer } = Layout;

export function HomePage() {
  const {
    recipes: dessertRecipes,
    loading: dessertLoading,
    error: dessertError,
  } = useAppSelector((state) => state.randomDessertRecipes);
  const {
    recipes: vegeterianRecipes,
    loading: vegeterianLoading,
    error: vegeterianError,
  } = useAppSelector((state) => state.randomVegetarianRecipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRandomDessertRecipes({}));
    dispatch(getRandomVegetarianRecipes({}));
  }, [dispatch]);

  return (
    <Layout className={style.layout}>
      <Header />
      <Divider />
      <Content className={style.content}>
        <DayRecipeCard />
        <div className={style.recipeBlocks}>
          <RecipeBlock
            loading={dessertLoading}
            error={dessertError}
            recipes={dessertRecipes}
            title="Sweet tooth"
          />
          <RecipeBlock
            loading={vegeterianLoading}
            error={vegeterianError}
            recipes={vegeterianRecipes}
            title="Vegetarian"
          />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
