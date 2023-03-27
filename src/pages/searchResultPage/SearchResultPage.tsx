import { Button, Divider, Layout, Space, Spin } from 'antd';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { useAppSelector } from '../../hooks';
import style from './style.module.css';

const { Content, Footer } = Layout;

export function SearchResultPage() {
  const {
    list: recipes,
    loading,
    error,
  } = useAppSelector((state) => state.searchedRecipes);

  return (
    <Layout className="layout">
      <Header />
      <Content className={style.content}>
        <h2>Search result: </h2>
        {error && <p className={style.error}>{error}</p>}
        <Divider />
        <Space
          direction="vertical"
          size="large"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {loading && <Spin />}
          {/* {error && !loading && modal.error({ content: error })} */}
          <RecipeCardList recipes={recipes} />
          <Button type="primary">Load more</Button>
        </Space>
      </Content>
      <Footer />
    </Layout>
  );
}
