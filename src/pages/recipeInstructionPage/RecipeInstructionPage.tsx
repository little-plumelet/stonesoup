import { Divider, Layout, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../commonComponents/header';
import {
  BASE_URL,
  ETags,
  MOBILE_SCREEN_WIDTH_BREACKPOINT,
  SIDER_INGREDIENTS_WITH,
} from '../../constants';
import { Ingredients } from '../../components/ingredients';
import style from './style.module.css';
import { RecipeTagList } from '../../components/recipeTagList';
import { RecipeInstructions } from '../../components/recipeInstructions/RecipeInstructions';
import { IDetailedRecipe } from '../../interfaces/detailedRecipe.interface';
import { Footer } from '../../commonComponents/footer';
import { useVeiwPort } from '../../customHooks/useViewPort';

const API_KEY = import.meta.env.VITE_SPINACULAR_API_KEY;

const { Content, Sider } = Layout;

export function RecipeInstructionPage() {
  const location = useLocation();
  const [data, setData] = useState<IDetailedRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { width } = useVeiwPort();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const id = location.pathname.match(/\d*/g)?.join('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        } else {
          setErrorMessage('Unknown error occurred');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Layout hasSider={width >= MOBILE_SCREEN_WIDTH_BREACKPOINT}>
      <Layout
        className={
          width >= MOBILE_SCREEN_WIDTH_BREACKPOINT
            ? style.layoutWithSider
            : style.layout
        }
      >
        <Header />
        <Divider style={{ margin: '0' }} />
        {loading && <Spin />}
        {errorMessage && <p className={style.error}>{errorMessage}</p>}
        {data && (
          <Content className={style.content}>
            <div>
              <h2 className={style.title}>{data.title}</h2>
            </div>
            <img
              src={data.image}
              alt="recipe"
              className={style.mainRecipeImg}
            />
            <RecipeTagList
              tags={[
                { title: ETags.likes, content: data.aggregateLikes },
                { title: ETags.preptime, content: data.readyInMinutes },
                {
                  title: ETags.servings,
                  content: data.servings,
                },
              ]}
            />
            {width < MOBILE_SCREEN_WIDTH_BREACKPOINT && data && (
              <div className={style.instructions}>
              <Ingredients extendedIngredients={data.extendedIngredients} />
              </div>
            )}
            <RecipeInstructions steps={data.analyzedInstructions[0]?.steps} />
          </Content>
        )}
        <Footer />
      </Layout>
      {width >= MOBILE_SCREEN_WIDTH_BREACKPOINT && (
        <Sider
          className={style.sider}
          width={SIDER_INGREDIENTS_WITH}
          reverseArrow
          style={{
            position: 'fixed',
            backgroundColor: 'var(--color-creamson)',
            width: 'var(--sider-ingredients-width)',
          }}
        >
          {data && (
            <Ingredients extendedIngredients={data.extendedIngredients} />
          )}
        </Sider>
      )}
    </Layout>
  );
}
