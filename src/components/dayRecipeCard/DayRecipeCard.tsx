import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import MOCK_DATA from './MOCKDATA.json';
import style from './style.module.css';

const { image, title, id } = MOCK_DATA;

export function DayRecipeCard() {
  const navigate = useNavigate();

  function showRecipeInstruction() {
    navigate(`/recipe/${id}`);
  }

  return (
    <Card className={style.dayRecipeCard}>
      <div className={style.content}>
        <div
          style={{
            backgroundImage: `url("${image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className={style.img}
        />
        <div className={style.desc}>
          <div>
            <p>Recipe of the day</p>
            <h2 className={style.title}>{title}</h2>
          </div>

          <Button
            data-testid="DayRecipeButton"
            shape="circle"
            size="large"
            icon={<ArrowRightOutlined />}
            className={style.arrow}
            onClick={showRecipeInstruction}
          />
        </div>
      </div>
    </Card>
  );
}
