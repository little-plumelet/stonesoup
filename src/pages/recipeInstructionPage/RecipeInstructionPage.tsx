import { Divider, Layout, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../commonComponents/header';
import { BASE_URL } from '../../constants';
import style from './style.module.css';

const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

const { Content, Sider } = Layout;
interface IIngredients {
  name: string;
  amount: number;
  unit: string;
}
export function RecipeInstructionPage() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const id = location.pathname.match(/\d*/g)?.join('');
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/recipes/${id}/information`,
          {
            params: {
              apiKey: API_KEY,
              includeNutrition: false,
            },
          }
        );
        console.log(response);
        setData(response?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.message);
          setLoading(false);
        } else {
          setErrorMessage('Unknown error occurred');
        }
      }
    })();
  }, [id]);

  return (
    <Layout className={style.layout}>
      <Header />
      <Divider style={{ margin: '0' }} />
      {loading && <Spin />}
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
      {data && (
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
      )}
    </Layout>
  );
}
