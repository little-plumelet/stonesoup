import { Divider, Layout } from 'antd';
import React, { useState } from 'react';
import { Header } from '../../commonComponents/header';
import style from './style.module.css';

const { Content, Sider } = Layout;
export function RecipeInstructionPage() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header />
      <Divider style={{ margin: '0' }} />
      <Layout hasSider>
        <Layout>
          <Content>
            {Array.from({ length: 100 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </React.Fragment>
            ))}
          </Content>
        </Layout>
        <Sider
          className={style.sider}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          reverseArrow
          style={{
            position: 'sticky',
            overflow: 'auto',
            backgroundColor: 'var(--color-creamson)',
          }}
        >
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </Sider>
      </Layout>
    </Layout>
  );
}
