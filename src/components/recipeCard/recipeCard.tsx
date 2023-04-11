import { DashboardOutlined, LikeTwoTone } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IDetailedRecipe } from '../../interfaces/detailedRecipe.interface';
import style from './style.module.css';

const { Meta } = Card;

type IRecipeCardProps = Pick<
  IDetailedRecipe,
  'id' | 'title' | 'image' | 'readyInMinutes' | 'aggregateLikes'
>;

export function RecipeCard({
  id,
  title,
  image,
  readyInMinutes,
  aggregateLikes,
}: IRecipeCardProps) {
  const navigate = useNavigate();

  function showRecipeInstruction() {
    navigate(`/recipe/${id}`);
  }

  return (
    <Card hoverable cover={<img alt="recipe" src={image} />}>
      <Meta
        title={
          <Tooltip title={title} placement="topLeft">
            {title}
          </Tooltip>
        }
        description={
          <div className={style.cookingTimeBlock}>
            <DashboardOutlined className={style.cookingTimeIcon} />
            <span
              className={style.cookingTime}
            >{`cooking time - ${readyInMinutes} min`}</span>
          </div>
        }
      />
      <footer className={style.footer}>
        <div className={style.likeBlock}>
          <span className={style.like}>{aggregateLikes}</span>
          <LikeTwoTone />
        </div>
        <div className={style.buttonBlock}>
          <Button key={id} onClick={showRecipeInstruction}>
            View recipe
          </Button>
        </div>
      </footer>
    </Card>
  );
}
