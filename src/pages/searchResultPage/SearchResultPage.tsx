import { Button, Divider, Layout, Space, Spin } from 'antd';
import { Footer } from '../../commonComponents/footer';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMoreRecipes } from '../../store/searchRecipe.slice';
import style from './style.module.css';

const { Content } = Layout;

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
      <Divider />
      <Content className={style.content}>
        {loading && (
          <div className={style.spinContainer}>
            <Spin size="large" data-testid="spin" />
          </div>
        )}
        {error && <p className={style.error}>{error}</p>}
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
              data-testid="loadMoreButton"
            >
              Load more
            </Button>
          </Space>
        )}
        {!error && !loading && !recipes.length && (
          <div className={style.noData}>no data</div>
        )}
      </Content>
      <Footer />
    </Layout>
  );
}
