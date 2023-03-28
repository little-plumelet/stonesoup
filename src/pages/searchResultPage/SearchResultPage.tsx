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
    offset,
  } = useAppSelector((state) => state.searchedRecipes);

  const HandleLoadMore = () => {
    console.log('clicked');
    console.log('offset = ', offset);
  };

  return (
    <Layout className={style.layout}>
      <Header />
      {error && <p className={style.error}>{error}</p>}
      <Divider />
      <Content className={style.content}>
        {loading && (
          <div className={style.spinContainer}>
            <Spin size="large" />
          </div>
        )}
        {!!recipes.length && (
          <Space
            direction="vertical"
            size="large"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <RecipeCardList recipes={recipes} />
            <Button type="primary" onClick={HandleLoadMore}>
              Load more
            </Button>
          </Space>
        )}
        {!loading && !recipes.length && (
          <div className={style.noData}>no data</div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
}
