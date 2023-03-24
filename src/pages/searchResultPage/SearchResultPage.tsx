import { Button, Divider, Layout, Space } from 'antd';
import { Header } from '../../commonComponents/header';
import { RecipeCardList } from '../../components/recipeCardList';
import style from './style.module.css';

const { Content, Footer } = Layout;

export function SearchResultPage() {
  return (
    <Layout className="layout">
      <Header />
      <Content className={style.content}>
        <h2>Search result: </h2>
        <Divider />
        <Space
          direction="vertical"
          size="large"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <RecipeCardList />
          <Button type="primary">Load more</Button>
        </Space>
      </Content>
      <Footer />
    </Layout>
  );
}
