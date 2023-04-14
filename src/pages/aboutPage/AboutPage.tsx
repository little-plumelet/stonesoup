import { Divider, Layout } from 'antd';
import { Footer } from '../../commonComponents/footer';
import { Header } from '../../commonComponents/header';
import style from './style.module.css';

const { Content } = Layout;

export function AboutPage() {
  return (
    <Layout className={style.layout}>
      <Header />
      <Divider />
      <Content className={style.content}>
        <div style={{ textAlign: 'center' }}>AboutPage...</div>
      </Content>
      <Footer />
    </Layout>
  );
}
