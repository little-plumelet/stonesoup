import { Layout } from 'antd';
import style from './style.module.css';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { DayRecipeCard } from '../../components/dayRecipeCard';

const { Content, Footer } = Layout;

export function HomePage() {
  return (
    <Layout className="layout">
      <Header />
      <Content className={style.content}>
        <DayRecipeCard />
        <RecipeCardList />
      </Content>
      <Footer />
    </Layout>
  );
}
