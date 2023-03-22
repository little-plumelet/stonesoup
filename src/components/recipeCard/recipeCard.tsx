import { DashboardOutlined, LikeTwoTone } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import { RECIPE_MOCK_DATA } from './recipeMockData';
import style from './style.module.css';

const { Meta } = Card;

export function RecipeCard() {
  const data = RECIPE_MOCK_DATA;

  return (
    <Card
      hoverable
      // style={{ width: 240 }}
      cover={<img alt="recipe" src={data?.image} />}
    >
      <Meta
        title={
          <Tooltip title={data?.title} placement="topLeft">
            {data?.title}
          </Tooltip>
        }
        description={
          <div className={style.cookingTimeBlock}>
            <DashboardOutlined className={style.cookingTimeIcon} />
            <span
              className={style.cookingTime}
            >{`cooking time - ${data?.readyInMinutes} min`}</span>
          </div>
        }
      />
      <div className={style.likeBlock}>
        <span className={style.like}>{data?.aggregateLikes}</span>
        <LikeTwoTone />
      </div>
    </Card>
  );
}
