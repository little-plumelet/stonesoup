import { Divider, Layout, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../commonComponents/header';
import { BASE_URL } from '../../constants';
import { IDetailedRecipe } from './interface';
import { Ingredients } from './parts/ingredients';
import style from './style.module.css';

const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

const { Content, Sider } = Layout;

/*
  example with state managing inside component
*/

export function RecipeInstructionPage() {
  const location = useLocation();
  const [data, setData] = useState<IDetailedRecipe | null>(null);
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
        setData(response?.data);
        setLoading(false);
      } catch (error) {
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
              {Array.from({ length: 200 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))}
            </Content>
          </Layout>
          <Sider
            className={style.sider}
            width={250}
            reverseArrow
            style={{
              position: 'sticky',
              overflow: 'auto',
              backgroundColor: 'var(--color-creamson)',
            }}
          >
            <Ingredients extendedIngredients={data.extendedIngredients} />
          </Sider>
        </Layout>
      )}
    </Layout>
  );
}
