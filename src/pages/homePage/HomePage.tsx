import { Divider, Layout } from 'antd';
import style from './style.module.css';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { DayRecipeCard } from '../../components/dayRecipeCard';
import { RECIPE_MOCK_DATA } from './recipeMockData';

const { Content, Footer } = Layout;

export function HomePage() {
  const data = [
    RECIPE_MOCK_DATA,
    RECIPE_MOCK_DATA,
    RECIPE_MOCK_DATA,
    RECIPE_MOCK_DATA,
  ];
  return (
    <Layout className="layout">
      <Header />
      <Divider />
      <Content className={style.content}>
        <DayRecipeCard />
        <RecipeCardList recipes={data} />
      </Content>
      <Footer />
    </Layout>
  );
}
