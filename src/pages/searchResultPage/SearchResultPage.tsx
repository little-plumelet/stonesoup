import { Button, Divider, Layout, Space, Spin } from 'antd';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMoreRecipes } from '../../store/searchRecipe.slice';
import style from './style.module.css';

const { Content, Footer } = Layout;

export function SearchResultPage() {
  const {
    list: recipes,
    loading,
    error,
    offset,
    totalResults,
    searchValue,
  } = useAppSelector((state) => state.searchedRecipes);
  const dispatch = useAppDispatch();

  const HandleLoadMore = () => {
    dispatch(getMoreRecipes({ value: searchValue, offset }));
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
            <Button
              loading={loading}
              type="primary"
              onClick={HandleLoadMore}
              disabled={totalResults === offset}
            >
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
